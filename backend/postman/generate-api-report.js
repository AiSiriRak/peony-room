const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'newman-report.json');
const mdPath = path.join(__dirname, '../../docs/api-test-report.md');

if (!fs.existsSync(jsonPath)) {
    console.error('Newman JSON report not found at:', jsonPath);
    process.exit(1);
}

const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const { stats, timings, executions } = report.run;

const escapeMd = (str) =>
    String(str || '')
        .replace(/\|/g, '\\|')
        .replace(/\n/g, ' ');

// 1. Map every request ID to its folder path from collection structure
const itemFolderMap = new Map();
const folderOrder = [];

function mapCollectionItems(items, folderPath = []) {
    if (!Array.isArray(items)) return;

    for (const item of items) {
        if (Array.isArray(item.item)) {
            // Folder (supports nested folders e.g. "Auth / Login")
            mapCollectionItems(item.item, [...folderPath, item.name]);
        } else {
            // Request
            const folderName =
                folderPath.length > 0 ? folderPath.join(' / ') : 'General';
            itemFolderMap.set(item.id, folderName);
            if (!folderOrder.includes(folderName)) {
                folderOrder.push(folderName);
            }
        }
    }
}

mapCollectionItems(report.collection?.item);

// 2. Group executions and aggregate stats per folder
const folderGroups = new Map();
folderOrder.forEach((name) => {
    folderGroups.set(name, {
        name,
        requestsTotal: 0,
        requestsPassed: 0,
        assertionsTotal: 0,
        assertionsPassed: 0,
        assertionsFailed: 0,
        executions: [],
    });
});

const failures = [];

executions.forEach((exec) => {
    const folderName = itemFolderMap.get(exec.item?.id) || 'General';
    if (!folderGroups.has(folderName)) {
        folderGroups.set(folderName, {
            name: folderName,
            requestsTotal: 0,
            requestsPassed: 0,
            assertionsTotal: 0,
            assertionsPassed: 0,
            assertionsFailed: 0,
            executions: [],
        });
    }

    const group = folderGroups.get(folderName);
    const assertions = exec.assertions || [];
    const failedInExec = assertions.filter((a) => a.error).length;
    const passedInExec = assertions.length - failedInExec;
    const isRequestPassed = !exec.requestError && failedInExec === 0;

    group.requestsTotal += 1;
    if (isRequestPassed) group.requestsPassed += 1;
    group.assertionsTotal += assertions.length;
    group.assertionsPassed += passedInExec;
    group.assertionsFailed += failedInExec;
    group.executions.push(exec);

    assertions.forEach((a) => {
        if (a.error) {
            failures.push({
                folder: folderName,
                request: `${exec.request?.method || '-'} ${exec.item?.name}`,
                assertion: a.assertion,
                message: a.error.message,
            });
        }
    });
});

// 3. Build Markdown Report
const totalAssertions = stats.assertions.total;
const failedAssertions = stats.assertions.failed;
const passedAssertions = totalAssertions - failedAssertions;
const passRate =
    totalAssertions > 0
        ? ((passedAssertions / totalAssertions) * 100).toFixed(2)
        : '0.00';
const durationSec = ((timings.completed - timings.started) / 1000).toFixed(2);
const avgResponse = Math.round(timings.responseAverage || 0);

let md = `# API Test Report\n\n`;
md += `- **Collection:** ${report.collection?.info?.name || 'API Tests'}\n`;
md += `- **Executed At:** ${new Date(timings.completed).toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' })} (GMT+7)\n`;
md += `- **Overall Status:** ${failedAssertions === 0 ? '✅ PASSED' : '❌ FAILED'} (**${passedAssertions}/${totalAssertions}** assertions passed — **${passRate}%**)\n`;
md += `- **Duration:** ${durationSec}s (Avg response: ${avgResponse}ms)\n\n`;

// Summary by Folder / Route
md += `## Summary by Route / Folder\n\n`;
md += `| Route / Folder | Status | Requests | Assertions Passed |\n`;
md += `| :--- | :---: | :---: | :---: |\n`;

for (const group of folderGroups.values()) {
    if (group.requestsTotal === 0) continue;
    const isFolderPassed =
        group.assertionsFailed === 0 &&
        group.requestsPassed === group.requestsTotal;
    const statusBadge = isFolderPassed ? '✅ Passed' : '❌ Failed';
    md += `| **${escapeMd(group.name)}** | ${statusBadge} | ${group.requestsPassed}/${group.requestsTotal} | ${group.assertionsPassed}/${group.assertionsTotal} |\n`;
}

// Overall Metrics
md += `\n## Overall Metrics\n\n`;
md += `| Metric | Total | Passed | Failed |\n`;
md += `| :--- | :---: | :---: | :---: |\n`;
md += `| **Iterations** | ${stats.iterations.total} | ${stats.iterations.total - stats.iterations.failed} | ${stats.iterations.failed} |\n`;
md += `| **Requests** | ${stats.requests.total} | ${stats.requests.total - stats.requests.failed} | ${stats.requests.failed} |\n`;
md += `| **Assertions (Tests)** | ${totalAssertions} | ${passedAssertions} | ${failedAssertions} |\n\n`;

// Execution Details Grouped by Folder
md += `## Execution Details\n\n`;

for (const group of folderGroups.values()) {
    if (group.executions.length === 0) continue;

    md += `### ${escapeMd(group.name)}\n\n`;
    md += `| # | Method | Test Case (Happy / Unhappy Path) | Status | Time | Assertions |\n`;
    md += `| :---: | :---: | :--- | :---: | :---: | :--- |\n`;

    group.executions.forEach((exec, idx) => {
        const method = exec.request?.method || '-';
        const name = escapeMd(exec.item?.name || 'Unnamed Request');
        const status = exec.response
            ? `${exec.response.code} ${exec.response.status}`
            : 'Error';
        const time = exec.response ? `${exec.response.responseTime}ms` : '-';

        const assertions = exec.assertions || [];
        const assertionSummary =
            assertions.length === 0
                ? '_No tests_'
                : assertions
                      .map((a) =>
                          a.error
                              ? `❌ ${escapeMd(a.assertion)}`
                              : `✅ ${escapeMd(a.assertion)}`,
                      )
                      .join('<br>');

        md += `| ${idx + 1} | \`${method}\` | ${name} | ${status} | ${time} | ${assertionSummary} |\n`;
    });

    md += `\n`;
}

// Failed Assertions Section (Only rendered if there are failures)
if (failures.length > 0) {
    md += `## Failed Assertions\n\n`;
    failures.forEach((f, i) => {
        md += `### ${i + 1}. [${f.folder}] ${f.request}\n`;
        md += `- **Test:** ${f.assertion}\n`;
        md += `- **Error:** \`${f.message}\`\n\n`;
    });
}

fs.mkdirSync(path.dirname(mdPath), { recursive: true });
fs.writeFileSync(mdPath, md, 'utf8');
fs.unlinkSync(jsonPath);
console.log(`Generated detailed Markdown report at: ${mdPath}`);

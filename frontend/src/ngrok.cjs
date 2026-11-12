const ngrok = require("@ngrok/ngrok");
const fs = require("fs");
const os = require("os");
const path = require("path");

const PORT = 5173;

function getAuthtokenFromConfig() {
  const configPath =
    process.platform === "win32"
      ? path.join(process.env.LOCALAPPDATA, "ngrok", "ngrok.yml")
      : path.join(
          os.homedir(),
          "Library",
          "Application Support",
          "ngrok",
          "ngrok.yml",
        );

  if (fs.existsSync(configPath)) {
    const content = fs.readFileSync(configPath, "utf8");
    const match = content.match(/authtoken:\s*([^\s]+)/);
    if (match) return match[1];
  }
  throw new Error(`ไม่พบ authtoken ในไฟล์ ${configPath}`);
}

async function forwardToApp() {
  const authtoken = getAuthtokenFromConfig();

  const forwarder = await ngrok.forward({
    addr: PORT,
    authtoken: authtoken,
    domain: "wreath-dividing-foothill.ngrok-free.dev",
  });

  console.log(`Available at: ${forwarder.url()}`);
}

forwardToApp();
process.stdin.resume();

require("dotenv").config();
const ngrok = require("@ngrok/ngrok");

const PORT = 5173;

async function forwardToApp() {
  const authtoken = process.env.NGROK_AUTHTOKEN;
  if (!authtoken) {
    throw new Error("No NGROK_AUTHTOKEN from .env");
  }

  const forwarder = await ngrok.forward({
    addr: PORT,
    authtoken: authtoken,
    domain: "wreath-dividing-foothill.ngrok-free.dev",
  });

  console.log(`Available at: ${forwarder.url()}`);
}

forwardToApp().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
process.stdin.resume();

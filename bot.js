const makeWASocket = require("@whiskeysockets/baileys").default;
const { useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");

    const { version } = await fetchLatestBaileysVersion();
    
    const sock = makeWASocket({
        version,
        auth: state
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async (update) => {
        const { connection } = update;

        if (connection === "open") {
            console.log("✅ NINA is connected!");
        } else if (connection === "close") {
            console.log("❌ Connection closed. Restarting...");
            startBot();
        }
    });

    // Generate Pairing Code
    const phoneNumber = "YOUR_PHONE_NUMBER_HERE"; // Replace with your number
    const code = await sock.requestPairingCode(phoneNumber);
    console.log(`🔑 Your Pairing Code: ${code}`);
    console.log("Enter this code on WhatsApp Web to connect.");
}

startBot();

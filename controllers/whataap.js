const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const client = new Client({
    // authStrategy: new NoAuth({
    authStrategy: new LocalAuth({
        // clientId: "client-two",
        // dataPath: "./data",
        restartOnAuthFail: false,
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process', // <- this one doesn't works in Windows
                '--disable-gpu',
            ],
        }
    })
});

client.initialize();

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true }, function (qrcode) {
        console.log(qrcode)
    });
});

client.on('authenticated', async (session) => {
    console.log('WHATSAPP WEB => Authenticated');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on("ready", async () => {
    console.log("WHATSAPP WEB => Ready");
});

client.on('disconnected', (reason) => {
    console.log('Session file deleted!');
    console.log('Client was logged out', reason);
    // client.initialize();
    client.resetState();
});
client.on('change_state', state => {
    console.log('CHANGE STATE', state);
});

module.exports = client;
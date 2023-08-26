#! /usr/bin/env ts-node
import { create, Whatsapp } from 'venom-bot';
import axios from 'axios';

import { TELEGRAMURL } from "../env.json";

const TEN_MIN = 600000;
let client: any = null;

const options = {
    session: "session1",
    autoClose: 0,
    browserArgs: [
        '--disable-web-security',
        '--no-sandbox',
        '--disable-web-security',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-extensions',
        '--disable-sync',
        '--disable-translate',
        '--hide-scrollbars',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-first-run',
        '--safebrowsing-disable-auto-update',
        '--ignore-certificate-errors',
        '--ignore-ssl-errors',
        '--ignore-certificate-errors-spki-list',
        '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'
    ],
}
function initBot() {
    try {
        dateLog('Initializing whatsappgram server')

        //	create bot with options
        create(options)
            // 	start bot
            .then((client) => startBot(client))
            // 	catch errors
            .catch((err) => {
                dateLog(err)
            })
    } catch (error: any) {
        console.log("catch initBot", error);
        client.close();
    }
}

function startBot(_client: any) {
    dateLog('Starting bot');
    client = _client;

    //	restart bot every 10 minutos
    //	stops working otherwise
    setTimeout(() => {
        //	close bot
        client.close()
        dateLog('Closing bot')

        //	init bot again
        initBot()
    }, TEN_MIN)

    client.onMessage(telegram)
}

function telegram(message: any) {
    const sender = message.from;
    //dateLog(`Message received from ${"+" + sender.replaceAll("@c.us", "")} ${message.sender.name ? message.sender.name : ""}:`);

    const msg: string = `Message received from ${"+" + sender.replaceAll("@c.us", "")} ${message.sender.name ? message.sender.name : ""}:\n${(message.type == 'chat') ? message.content : `Sent ${message.type}`}`;
    dateLog(msg);
    axios.post(`${TELEGRAMURL}`, { message: msg });

    console.log(msg);
    //const replyText = 'Reply message';
    //client.sendText(sender, replyText);
    //dateLog(`Message: "${replyText}" sent to: ${"+" + sender.replaceAll("@c.us", "")}`);
}


// Catch ctrl+C
process.on('SIGINT', () => {
    console.log("Closing on ctrl-c");
    client.close()
})

function dateLog(text: any) {
    console.log(new Date(), ' - ', text)
}

initBot();

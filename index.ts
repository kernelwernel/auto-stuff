const { Client } = require('discord.js-selfbot-v13');

import 'dotenv/config'

const client = new Client();

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function rng_minutes(min: number, max: number): number {
    min -= 1; // because of .ceil()
    min *= 1000 * 60;
    max *= 1000 * 60;
    return Math.ceil(Math.random() * (max - min) + min);
}

function rng_seconds(min: number, max: number): number {
    min *= 1000;
    max *= 1000;
    return Math.ceil(Math.random() * (max - min) + min);
}

export async function bump() {
    const channel = client.channels.cache.get(process.env.CHANNEL);
    let count = 0;

    while (true) {
        var d = new Date();
        var date = d.toLocaleTimeString();

        count += 1;

        console.log("[" + date + "] bump count: " + count);
        await channel.sendSlash(process.env.BOT_ID, 'bump');

        let delay_length: number = 1000 * 60 * 60 * 2;  // 2 hours
        delay_length += rng_minutes(2, 15); // add 2 to 15 minutes as a delay
        delay_length += rng_seconds(2, 59); // add 2 to 59 seconds as a delay
        await delay(delay_length);
    }
}

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);

    bump();
})

client.login(process.env.TOKEN);
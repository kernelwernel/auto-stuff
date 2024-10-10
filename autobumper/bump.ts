const { Client } = require('discord.js-selfbot-v13');

import 'dotenv/config'

const client = new Client();
const args = process.argv.slice(2);
const has_output: boolean = (args[0] != "--no-output");

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

function msToTime(duration: number): string{
    var milliseconds: number = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    let hours_str = (hours < 10) ? "0" + hours : hours;
    let minutes_str = (minutes < 10) ? "0" + minutes : minutes;
    let seconds_str = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours_str + ":" + minutes_str + ":" + seconds_str + "." + milliseconds;
}

export async function bump() {
    const channel = client.channels.cache.get(process.env.CHANNEL);
    let count = 0;
    const base_delay: number = 1000 * 60 * 30;  // 30 min

    while (true) {
        try {
            var d = new Date();
            var date = d.toLocaleTimeString();
            
            // THIS IS THE PROBLEM
            await channel.sendSlash(process.env.BOT_ID, 'bump');

            count += 1;

            if (has_output) {
                console.log("[" + date + "] bump count: " + count);
            }

            await client.user.setActivity("bump count: " + count);
            
            let delay_length: number = base_delay;
            delay_length += rng_minutes(2, 6);  // add 2 to 6 minutes as a delay
            delay_length += rng_seconds(2, 59); // add 2 to 59 seconds as a delay

            if (has_output) {
                console.log("next delay: " + msToTime(delay_length));
            }

            await delay(delay_length);

            if (has_output) {
                console.log("\n");
            }
        } catch (error) {
            channel.message.send("@<550095505347051546> failed to bump: \`\`\`" + error + "\`\`\`");
            //console.log(error);
        }
    }
}

client.on('ready', async () => {
    if (has_output) {
        console.log(`${client.user.username} is ready!`);
    }
    
    bump();
})

client.login(process.env.TOKEN);

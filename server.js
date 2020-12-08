require("dotenv").config();

const { Client } = require("discord.js");
const bot = new Client();

bot.on("ready", () => console.log("bot logged in"));

bot.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.channel.send("pong");
  }
});

bot.login(process.env.BOT_TOKEN);

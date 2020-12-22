require("dotenv").config();
const { uuid } = require("@redoxengine/medical-word-uuid");
const http = require("http");
const { list } = require("./food-name.js");
const { Client } = require("discord.js");

const bot = new Client();
const PREFIX = "$";
// function for bot
bot.on("ready", () => console.log(`${bot.user.tag} has logged in.`));
bot.on("message", (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.name !== "random-chat") return;
  if (msg.content.startsWith(PREFIX)) {
    const [cmd, ...args] = msg.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (cmd === "ping") msg.channel.send("pong");
    if (cmd === "rand")
      msg.channel.send(
        `${uuid(2)} ${list[Math.floor(Math.random() * list.length)]}`
      );
    // if (cmd === "arr") msg.channel.send(list[Math.floor(Math.random()* list.length)]);
  }
});
bot.login(process.env.BOT_TOKEN);

//function for webserver
const getListener = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<div style=' display: grid;
  justify-content: center;
  align-content: center;
  height:100%;
  font-size:20px;'><h1>${uuid(2)} ${
    list[Math.floor(Math.random() * list.length)]
  }</h1></div>`);
  res.end();
};
const app = http.createServer(getListener);
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log("server started in " + PORT));

require("dotenv").config();
const commands = require("./commands");
const { PORT, DISCORD_CLIENT_TOKEN } = process.env;
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("error", (error) => {
  console.error(error);
});

const reduceResponse = (response) => {
  if (response.length > 4000) {
    return response.slice(0, 2000);
  } else {
    return response;
  }
};

client.on("messageCreate", async (message) => {
  if (
    message.author.username === "eddb-bot" ||
    !/^\!ed/.test(message.content)
  ) {
    return;
  }
  const parentCommand = message.content.slice(4);

  switch (true) {
    // case /^testMessage/.test(parentCommand):
    //   console.log(exampleEmbed);
    //   message.channel.send({ embeds: [exampleEmbed] });
    //   break;
    case /^ping/.test(parentCommand):
      message.channel.send(
        `🏓 Latency is ${
          Date.now() - message.createdTimestamp
        }ms. API Latency is ${Math.round(client.ws.ping)}ms`
      );
      break;
    case /^help/.test(parentCommand):
      message.channel.send("Work in progress.");
      break;
    case /^edsm/.test(parentCommand):
      const { edsm } = commands;
      const [command, ...params] = parentCommand.slice(5).split(" ");
      if (command in edsm) {
        try {
          const response = await edsm[command].function(params);
          message.channel.send(reduceResponse(JSON.stringify(response)));
        } catch (e) {
          console.error(e);
          const errorMessage = e.toString();
          message.channel.send(`There was an error: ${errorMessage}`);
        }
      } else {
        message.channel.send(
          `EDSM case hit; however, "${command}" does not exist.`
        );
      }
      break;
    case /^carrier-departure/.test(parentCommand):
      try {
        message.channel.send(
          "🚀 Countdown for carrier departure: 15 minutes 🕙"
        );
      } catch (e) {
        const errorMessage = e.toString();
        message.channel.send(`There was an error: ${errorMessage}`);
      }
      break;
    default:
      message.channel.send("Sorry, that command doesn't work yet. - Brady S");
  }
});

client.login(DISCORD_CLIENT_TOKEN);

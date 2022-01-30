require('dotenv').config();
const commands = require('./commands');
const { PORT, DISCORD_CLIENT_TOKEN } = process.env;
const { Client, Intents } = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const { tableBuilder } = require('./utils/messageBuilder');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('error', (error) => {
  console.error(error);
});

const reduceResponse = (response) => {
  if (response.length > 2000) {
    return response.slice(0, 2000);
  } else {
    return response;
  }
};

client.on('interactionCreate', async (interaction) => {
  console.log(interaction);
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  console.log(commandName, 'command hit!', interaction);
});

client.on('messageCreate', async (message) => {
  if (message.author.username === 'eddb-bot' || !/^\!ed/.test(message.content)) {
    return;
  }

  // .slice(4) is slicing out "!ed "
  const [parentCommand, subCommand, ...params] = message.content.slice(4).split(' ');

  switch (true) {
    case /^commodity/.test(parentCommand):
      const commander = message.author.username;
      const command = message.content;
      const exampleEmbed = tableBuilder({ command, commander });
      message.channel.send(exampleEmbed);
      break;
    case /^ping/.test(parentCommand):
      message.channel.send(
        `🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`
      );
      break;
    case /^nearest\-\w+\-to\-buy/.test(parentCommand):
      const commodity = parentCommand.replace(/nearest\-(\w+)\-to\-buy/, '$1');
      message.channel.send(
        `PLease wait while I fetch "${commodity}" at lowest price from local systems based your latest coordinates, CMDR ${message.author.username}...`
      );
      console.log(parentCommand);
      break;
    case /^help/.test(parentCommand):
      message.channel.send('Work in progress.');
      break;
    case /^edsm/.test(parentCommand):
      const { edsm } = commands;
      if (subCommand in edsm) {
        try {
          const response = await edsm[subCommand].function(params.join(' '));
          message.channel.send(reduceResponse(JSON.stringify(response)));
        } catch (e) {
          console.error(e);
          const errorMessage = e.toString();
          message.channel.send(`There was an error: ${errorMessage}`);
        }
      } else {
        message.channel.send(`EDSM case hit; however, "${subCommand}" does not exist.`);
      }
      break;
    case /^carrier-departure/.test(parentCommand):
      try {
        message.channel.send('🚀 Countdown for carrier departure: 15 minutes 🕙');
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

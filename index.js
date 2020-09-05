require('dotenv').config()

const Discord = require('discord.js')
const Bot = require('./config/client')

const EmbeddedMessage = require('./shared/embedded-message')

const CronJob = require('cron').CronJob

const FreeGames = require('./services/freeGames');

const helpMessage = require('./commands/help/help')

const bot = new Bot()

// Create command collection
const botCommands = require('./commands')

// Populate command collection
Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TodayFormatted = new Date().toLocaleDateString()

const EpicFreeGames = new EmbeddedMessage()
  .setTitle(`${TodayFormatted}`)
  .setAuthor('Epic Free Games', 'https://img.icons8.com/nolan/2x/epic-games.png', 'https://www.epicgames.com/store/en-US/free-games')
  .setColor('#0078F2')


bot.on('ready', async () => {
  try {
    // The Games
    await FreeGames.FreeGameTitles.then(response =>
      EpicFreeGames.setDescription(response.map(item => item.title))
    )

    // Every Thursday at 18:00 UTC
    const job = new CronJob('0 18 * * 4', () => {
      bot.channels.cache.get(process.env.TEMP_CHANNEL_ID).send(EpicFreeGames)
    }, null, true, 'UTC')

    job.start()

    console.info(`Logged in as ${bot.user.tag}!`);
  } catch {
    console.info("Error starting..")
  }
})

bot.on('message', msg => {

  const args = msg.content.split(/ +/);
  const params = args[1]
  const command = args.shift();

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args, params);
  } catch (error) {
    console.error(error);
    msg.reply('Error executing command!');
  }

})

module.exports.EpicFreeGames = EpicFreeGames

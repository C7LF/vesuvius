require('dotenv').config()

const Discord = require('discord.js')
const bot = new Discord.Client()
const TOKEN = process.env.TOKEN;

const EmbeddedMessage = require('./lib/embedded-message');

const CronJob = require('cron').CronJob

const DATA = require('./services/freeGames');

bot.login(TOKEN)


const TodayFormatted = new Date().toLocaleDateString()

const EpicFreeGames = new EmbeddedMessage()
  .setTitle(`${TodayFormatted}`)
  .setAuthor('Epic Free Games', 'https://img.icons8.com/nolan/2x/epic-games.png', 'https://www.epicgames.com/store/en-US/free-games')
  .setColor('#0078F2')


bot.on('ready', async () => {

  // The Games
  await DATA.FreeGameTitles.then(response =>
    EpicFreeGames.setDescription(response.map(item => item.title))
  )

  // Every Thursday at 18:00 UTC
  const job = new CronJob('0 18 * * 4', () => {
    bot.channels.cache.get(process.env.TEMP_CHANNEL_ID).send(EpicFreeGames)
  }, null, true, 'UTC')

  job.start()

  console.info(`Logged in as ${bot.user.tag}!`);
})

bot.on('message', msg => {
  
  // Show free games on .fg command
  if (msg.content === '.fg') {
    msg.reply(EpicFreeGames)
  }
  
})

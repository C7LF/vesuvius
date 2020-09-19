import EmbeddedMessage from './embedded-message'

const TodayFormatted: string = new Date().toLocaleDateString()

export const FreeGamesMessage = new EmbeddedMessage()
.setTitle(`${TodayFormatted}`)
.setAuthor(
  "Epic Free Games",
  "https://img.icons8.com/nolan/2x/epic-games.png",
  "https://www.epicgames.com/store/en-US/free-games"
)
.setColor("#0078F2");
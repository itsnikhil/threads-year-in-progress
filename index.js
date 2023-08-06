require('dotenv').config()
const { ThreadsAPI } = require('threads-api')

const TOTAL_DAYS_IN_A_YEAR = 365

/**
 *
 * @param {Date} date from when you want to calculate
 * @returns {number} number of days elapsed for that year
 */
const getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date - start
  const oneDay = 1000 * 60 * 60 * 24 // milliseconds in a day
  const dayOfYear = Math.floor(diff / oneDay)
  return dayOfYear
}

/**
 * 
 * @param {number} progress percentage completed
 * @param {number} total maximum possible value
 * @param {number} width length of progress bar
 * @returns {string} progress bars made of Unicode symbols. Ex: ▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱▱ 52%
 */
function createProgressBar(progress, total, width) {
  const filledWidth = Math.round((progress / total) * width);
  const emptyWidth = width - filledWidth;
  const filledBar = '▰'.repeat(filledWidth);
  const emptyBar = '▱'.repeat(emptyWidth);

  return `${filledBar}${emptyBar}`;
}

/**
 *
 * @param {string} message you want to publish upto 500 characters
 */
const createThreadMessage = async (text) => {
  const threadsAPI = new ThreadsAPI({
    userID: process.env.USER_ID,
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD,
    deviceID: process.env.THREADS_DEVICE_ID,
    verbose: true,
  })

  const result = await threadsAPI.publish({ text })
  console.log('Result:', result)
}

const today = new Date()
const dayOfYear = getDayOfYear(today)
const percentage = (dayOfYear / TOTAL_DAYS_IN_A_YEAR) * 100
const progressBarWidth = 30;
const totalProgress = 100;
const progressBarAscii = createProgressBar(percentage, totalProgress, progressBarWidth)

const message = `${dayOfYear} days passed in ${today.getFullYear()}
${progressBarAscii}
${percentage.toFixed(2)}% complete`

console.debug({ message })
createThreadMessage(message)

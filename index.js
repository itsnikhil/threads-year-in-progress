require('dotenv').config()
const { ThreadsAPI } = require('threads-api')

/**
 *
 * @param {number} current year in 4 digit
 * @returns {boolean} true when current year is a leap year
 */
const isLeapYear = (year) => ((year & 3) === 0 && ((year % 25) != 0 || (year & 15) == 0))

/**
 *
 * @param {number} current year in 4 digit
 * @returns {number} total number of days in that year
 */
const totalDaysInYear = (year) => isLeapYear(year) ? 366 : 365

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
    verbose: false,
  })

  const result = await threadsAPI.publish({ text })
  console.log('Result:', result)
}

const today = new Date()
const dayOfYear = getDayOfYear(today)
const percentage = (dayOfYear / totalDaysInYear(today.getFullYear())) * 100
const progressBarWidth = 30;
const totalProgress = 100;
const progressBarAscii = createProgressBar(percentage, totalProgress, progressBarWidth)

const message = `${dayOfYear} days passed in ${today.getFullYear()}
${progressBarAscii}
${percentage.toFixed(2)}% complete`

console.debug({ message })
createThreadMessage(message)

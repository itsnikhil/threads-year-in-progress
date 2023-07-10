require('dotenv').config()
const { ThreadsAPI } = require('threads-api')

const TOTAL_DAYS_IN_A_YEAR = 365

/**
 *
 * @param {number} percentage completed percentage value between 0 to 100
 * @returns {string} progress bar chart url
 */
const generateProgressChartUrl = (percentage) => {
  const params = {
    chco: '3A69C1,CFECF7',
    chd: `a:${percentage}|${100 - percentage}`,
    chdlp: 'r',
    chl: `${percentage.toFixed(2)}%`,
    chlps: 'color,ffffff',
    chma: '0,10,0,-10',
    chs: '512x72',
    cht: 'bhs',
    chtt: 'Year in Progress',
  }

  const chartUrl = new URL('https://image-charts.com/chart')
  Object.entries(params).forEach(([k, v]) => chartUrl.searchParams.set(k, v))
  return chartUrl.toString()
}

/**
 *
 * @param {Date} date from when you want to calculate
 * @returns {number} number of days elapsed for that year
 */
function getDayOfYear(date) {
  var start = new Date(date.getFullYear(), 0, 0)
  var diff = date - start
  var oneDay = 1000 * 60 * 60 * 24 // milliseconds in a day
  var dayOfYear = Math.floor(diff / oneDay)
  return dayOfYear
}

/**
 *
 * @param {string} message you want to publish upto 500 characters
 * @param {string} image link to image (optional)
 */
const createThreadMessage = async (text, image = undefined) => {
  try {
    const threadsAPI = new ThreadsAPI({
      username: process.env.INSTAGRAM_USERNAME, // Your username
      password: process.env.INSTAGRAM_PASSWORD, // Your password
    })

    const result = await threadsAPI.publish({
      text,
      image,
    })
    console.log('Result:', result)
  } catch (error) {
    console.error('Failed to publish to threads', error)
  }
}

const today = new Date()
const dayOfYear = getDayOfYear(today)
const percentage = (dayOfYear / TOTAL_DAYS_IN_A_YEAR) * 100
const chartUrl = generateProgressChartUrl(percentage)
const message = `${today.getFullYear()} is ${percentage.toFixed(2)}% complete`

console.debug({ message, chartUrl })
createThreadMessage(message, chartUrl)

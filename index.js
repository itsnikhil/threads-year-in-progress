require('dotenv').config()
const { ThreadsAPI } = require('threads-api')
const { getDayOfYear } = require('./chart')

const TOTAL_DAYS_IN_A_YEAR = 365

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

const message = `${today.getFullYear()} is ${percentage.toFixed(2)}% complete`
const chartUrl = "https://github.com/itsnikhil/threads-year-in-progress/raw/main/.github/cover.jpg"

console.debug({ message, chartUrl })
createThreadMessage(message, chartUrl)

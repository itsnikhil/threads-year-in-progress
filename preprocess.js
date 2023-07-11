const https = require('https')
const fs = require('fs')
const { getDayOfYear, generateProgressChartUrl } = require('./chart')

const TOTAL_DAYS_IN_A_YEAR = 365

const downloadFile = async (fileUrl, outputFilePath) => {
  return new Promise((resolve, reject) => {
    try {
      const file = fs.createWriteStream(outputFilePath)
      const request = https.get(fileUrl, function (response) {
        response.pipe(file)
      })

      request.on('error', function (err) {
        console.error('Error downloading the image:', err)
        return reject(err)
      })

      file.on('finish', function () {
        console.log('Image downloaded and saved successfully.')
        file.close()
        return resolve(outputFilePath)
      })

      file.on('error', function (err) {
        console.error('Error saving the image:', err)
        return reject(err)
      })
    } catch (error) {
      console.error('Unexpected error in downloading file:', error)
      return reject(error)
    }
  })
}

const today = new Date()
const dayOfYear = getDayOfYear(today)
const percentage = (dayOfYear / TOTAL_DAYS_IN_A_YEAR) * 100
const chartUrl = generateProgressChartUrl(percentage)

// script should fail loudly to make sure pipeline break
downloadFile(chartUrl, '.github/cover.jpg')

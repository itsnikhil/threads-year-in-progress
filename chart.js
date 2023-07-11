/**
 *
 * @param {number} percentage completed percentage value between 0 to 100
 * @returns {string} progress bar chart url
 */
exports.generateProgressChartUrl = (percentage) => {
  const params = {
    chtt: 'Year Progress',
    chco: '3A69C1,CFECF7',
    chd: `a:${percentage}|${100 - percentage}`,
    chdlp: 'r',
    chl: `${percentage.toFixed(2)}%`,
    chlps: 'color,ffffff',
    chma: '0,10,0,-10',
    chs: '512x72',
    cht: 'bhs',
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
exports.getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date - start
  const oneDay = 1000 * 60 * 60 * 24 // milliseconds in a day
  const dayOfYear = Math.floor(diff / oneDay)
  return dayOfYear
}

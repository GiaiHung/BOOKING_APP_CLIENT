const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
function dayDifference(date1, date2) {
  const time1 = new Date(date1).getTime()
  const time2 = new Date(date2).getTime()
  const timeDiff = Math.abs(time2 - time1)
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
  return diffDays
}

export default dayDifference

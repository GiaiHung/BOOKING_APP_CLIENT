function getDatesInRange(date1, date2) {
    const startDate = new Date(date1)
    const endDate = new Date(date2)
    const dates = []
    let currentDateCount = new Date(startDate.getTime())
    while(currentDateCount < endDate.getTime()) {
        dates.push(new Date(currentDateCount).getTime())
        currentDateCount.setDate(currentDateCount.getDate() + 1)
    }
    return dates
}

export default getDatesInRange
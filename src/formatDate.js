import moment from 'moment-timezone'

function formatDate (date,
                     {
                       timezone=false,
                       timeFormat = 'h:mma',
                       hourLabel = 'hour',
                       hoursLabel = 'hours',
                       minuteLabel = 'min',
                       minutesLabel = 'min',
                       dayLabel = 'day',
                       daysLabel = 'days',
                       condensed = false,
                     } = {}) {
  const momentDate = timezone ? moment.utc(date).tz(timezone) : moment(date)
  const today = timezone ? moment.utc(new Date()).tz(timezone) : moment(new Date())
  const isToday = moment(today).isSame(momentDate, 'day')
  const isThisYear = moment(today).isSame(momentDate, 'year')

  const duration = moment.duration(today.diff(momentDate))
  const seconds = Math.floor(duration.asSeconds())
  const minutes = Math.floor(duration.asMinutes())
  const hours = Math.floor(duration.asHours())
  const days = Math.floor(duration.asDays())

  const formatOutput = (label, value) => {
    return condensed === true ? `${value}${label}` : `${value} ${label} ago`
  }

  // IF the time is in the past minute, show "Just Now"
  // IF the time is in the last hour, show minutes since (i.e. 2 min. ago)
  // IF the time is from today - show the hourly time (i.e. 6:00pm, or 9:06am)
  // IF the time is not from today, but is in the last 24 hours, show the hours since (i.e. 20 hours ago)
  // IF the time is greater than 24 hours ago, show the days (i.e. 3 days ago)
  // IF time is greater than 6 days, then show date (i.e. Mar 14, or Dec 12 ’16 if year is NOT current year)
  if (seconds < 60) {
    return 'Just Now'
  }
  if (minutes < 60) {
    const label = minutes > 1 ? minutesLabel : minuteLabel
    return formatOutput(label, minutes)
  }
  if (hours < 24) {
    if (isToday) {
      return momentDate.format(timeFormat)
    }
    const label = hours > 1 ? hoursLabel : hourLabel
    return formatOutput(label, hours)
  }
  if (hours >= 24 && days < 7) {
    const label = days > 1 ? daysLabel : dayLabel
    return formatOutput(label, days)
  }
  const dateFormat = 'MMM D, \'YY'
  const dateFormatThisYear = 'MMM D'
  if (days >= 7 && isThisYear) {
    return momentDate.format(dateFormatThisYear)
  }
  return momentDate.format(dateFormat)
}

export default formatDate

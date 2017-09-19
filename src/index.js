import moment from 'moment-timezone'

function formatDate(date, timezone, timeFormat='h:mma') {
  return moment.utc(date).tz(timezone).format(`YYYY-MM-DD ${timeFormat}`)
}
export default formatDate

import moment from 'moment'
var formatDate = {
  full (date) {
    return moment(date).format('YYYY-MM-DD HH:mm')
  }
}
export { formatDate }
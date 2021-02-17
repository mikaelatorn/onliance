var getColor = {
  tag (category) {
    if (category === 'Marketing') {
      return 'primary'
    } else if (category === 'Sales') {
      return 'success'
    } else if (category === 'Consignment') {
      return 'warning'
    } else {
      return 'danger'
    }
  }
}
export { getColor }

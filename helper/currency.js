function changeCurrency(value) {
    return new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(value)
}

module.exports = changeCurrency
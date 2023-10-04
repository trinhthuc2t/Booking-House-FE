const formatCurrency = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

const formatDate = (date) => {
  return date.split("-").reverse().join("/");
}

export {formatCurrency, formatDate};
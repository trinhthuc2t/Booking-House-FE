import {format} from "date-fns";

const formatCurrency = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

const formatDate = (date) => {
  return date.split("-").reverse().join("/");
}

const convertDateFormat = (input) => {
  return format(new Date(input), "dd/MM/yyyy HH:mm");
}

export {formatCurrency, formatDate, convertDateFormat};
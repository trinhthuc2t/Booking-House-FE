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

const getTotalDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
}

const formatDateTimeMessage = (dateString) => {
  let now = new Date();
  let date = new Date(dateString);
  let hours = date.getHours()
  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  let dates = (date.getDate() < 10 ? '0' : '') + date.getDate();
  let months = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
  let years = date.getFullYear();
  if (years === now.getFullYear()){
    if (date.getMonth() === now.getMonth() && date.getDate() === now.getDate())
      return `${hours}:${minutes}`;
    else
      return `${hours}:${minutes}, ${dates}/${months}`;
  }
  return `${hours}:${minutes}, ${dates}/${months}/${years}`;
}

export {formatCurrency, formatDate, convertDateFormat, getTotalDays, formatDateTimeMessage};
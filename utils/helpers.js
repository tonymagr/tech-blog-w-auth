module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear()}`;
  },
  // Helper "incr" to increment @index by 1 for each record displayed. Was starting at 0 - prefer start at 1.
  incr: (index) => {
    return index + 1;
  },
};

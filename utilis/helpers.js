// Exporting an object with a format_date function
module.exports = { 
  // Function to format a date as "mm/dd/yyyy"
  format_date: date => {
    // Extract month, day, and year components from the date object
    const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0 for January)
    const day = date.getDate();
    const year = date.getFullYear();

    // Return the formatted date string in "mm/dd/yyyy" format
    return `${month}/${day}/${year}`;
  }
}

export function convertTimeFormat(dateString) {
  let date = new Date(dateString);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? " PM," : " AM,";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based
  let year = date.getFullYear();

  let formattedTime = `${hours}:${minutes}${ampm}`;
  let formattedDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;

  return `${formattedTime} ${formattedDate}`;
}

export function chunkArray(array, chunkSize) {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

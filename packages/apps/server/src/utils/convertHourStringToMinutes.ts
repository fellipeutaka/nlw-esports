/**
 * It takes a string in the format of "HH:MM" and returns the number of minutes that string represents.
 * @param {string} hourString - string = "10:00"
 * @returns the amount of minutes in the hourString.
 */
export function convertHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);
  const minutesAmount = hours * 60 + minutes;
  return minutesAmount;
}

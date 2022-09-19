/**
 * It takes a number of minutes and returns a string in the format "HH:MM" where HH is the number of
 * hours and MM is the number of minutes
 * @param {number} minutesAmount - number
 * @returns A string in the format of HH:MM
 */
export function convertMinutesToHourString(minutesAmount: number) {
  const hours = String(Math.floor(minutesAmount / 60)).padStart(2, "0");
  const minutes = String(minutesAmount % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
}

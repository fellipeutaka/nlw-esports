import { convertMinutesToHourString } from "./convertMinutesToHourString";

export function displayHours(hourStart: number, hourEnd: number) {
  return `${convertMinutesToHourString(
    hourStart
  )} - ${convertMinutesToHourString(hourEnd)}`;
}

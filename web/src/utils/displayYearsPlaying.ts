export function displayYearsPlaying(yearsPlaying: number) {
  if (yearsPlaying === 1) {
    return "1 ano";
  } else {
    return `${yearsPlaying} anos`;
  }
}

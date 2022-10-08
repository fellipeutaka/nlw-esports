export function checkIfYearsPlayingIsGreaterThanGameReleaseDate(
  releaseAt: string,
  yearsPlaying: number
) {
  const now = new Date();
  const yearsPlayingDate = new Date(
    now.setFullYear(now.getFullYear() - yearsPlaying)
  );
  const releaseAtDate = new Date(releaseAt);
  const yearsPlayingIsGreaterThanGameReleaseDate =
    Date.parse(yearsPlayingDate.toDateString()) <
    Date.parse(releaseAtDate.toDateString());
  return yearsPlayingIsGreaterThanGameReleaseDate;
}

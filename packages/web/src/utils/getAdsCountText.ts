export function getAdsCountText(adsCount: number) {
  if (adsCount === 0) {
    return "Nenhum anúncio";
  }
  if (adsCount === 0) {
    return "1 anúncio";
  }
  return `${adsCount} anúncios`;
}

export function countAds(adsAmount: number) {
  if (adsAmount === 0) {
    return "Nenhum anúncio";
  }
  if (adsAmount === 1) {
    return "1 anúncio";
  }
  return `${adsAmount} anúncios`;
}

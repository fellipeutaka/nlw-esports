interface GetBannerPhotoParams {
  url: string;
  width: string;
  height: string;
}

export function getBannerPhoto({ url, width, height }: GetBannerPhotoParams) {
  const imgSrc = url.replace("{width}", width).replace("{height}", height);
  return imgSrc;
}

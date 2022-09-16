interface GetBannerPhotoProps {
  url: string;
  width: number;
  height: number;
}

export function getBannerPhoto({ url, width, height }: GetBannerPhotoProps) {
  const imgSrc = url
    .replace("{width}", String(width))
    .replace("{height}", String(height));
  return imgSrc;
}

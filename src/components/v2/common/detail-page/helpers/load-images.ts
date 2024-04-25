import { ImagesType } from '../interfrace';

export async function loadImages(
  images: ImagesType[],
  setValidImages: React.Dispatch<React.SetStateAction<ImagesType[]>>,
  checkImage: any
) {
  const validImageIndexes = await Promise.all(
    images.map(async (image, index) => {
      let isValid;
      if (
        image.name === 'GIA Certificate' ||
        image.name === 'B2B' ||
        image.name === 'B2B Sparkle'
      ) {
        if (image.url === 'null' || image.url === null || !image.url.length) {
          isValid = false;
        } else {
          isValid = true;
        }
      } else {
        isValid = await checkImage(image.url);
      }

      return isValid ? index : null;
    })
  );
  setValidImages(
    validImageIndexes
      .filter(index => index !== null)
      .map((items: any) => images[items])
  );
}

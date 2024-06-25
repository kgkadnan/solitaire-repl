import { IImagesType } from '../interface';

export async function loadImages(
  images: IImagesType[],
  setValidImages: React.Dispatch<React.SetStateAction<IImagesType[]>>,
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
        isValid = image.url_check;
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

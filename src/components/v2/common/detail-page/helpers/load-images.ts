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
        image.name === 'Video' ||
        image.name === 'B2B Sparkle'
      ) {
        if (
          image.url === 'null' ||
          image.url === null ||
          !image.url.length ||
          image.url === undefined
        ) {
          isValid = false;
        } else {
          var checkUrl: any = image.url;
          if (image.name === 'GIA Certificate') {
            try {
              checkUrl = new URL(image.url);
              checkUrl = `${process.env.NEXT_PUBLIC_API_URL}public/proxy${checkUrl.pathname}`;
            } catch (error) {
              isValid = false;
            }
          } else {
            checkUrl = image.url_check;
          }
          const response = await fetch(checkUrl);

          const status = response.status;
          if (status === 200) {
            isValid = true;
          } else {
            isValid = false;
          }
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

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
          let xhr = new XMLHttpRequest();
          xhr.open('GET', image.url);

          // request state change event
          xhr.onreadystatechange = function () {
            // request completed?
            if (xhr.readyState !== 4) return;

            if (xhr.status === 200) {
              isValid = true;
              // request successful - show response
              console.log(xhr.responseText);
            } else {
              isValid = false;
              // request error
              console.log('HTTP error', xhr.status, xhr.statusText);
            }
          };

          // start request
          xhr.send();
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

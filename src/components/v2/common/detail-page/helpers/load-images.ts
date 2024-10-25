import { IImagesType } from '../interface';

export async function loadImages(
  images: any,
  setValidImages: React.Dispatch<React.SetStateAction<any>>,
  checkImage: any,
  isMatchingPair: boolean
) {
  const getValidImageIndexes = async (imagesProps: IImagesType[]) => {
    const validImageIndexes = await Promise.all(
      imagesProps.map(async (image, index) => {
        let isValid;
        if (
          image.name === 'Certificate' ||
          image.name === 'Video' ||
          image.name === 'Sparkle'
        ) {
          isValid = image.url_check;
        } else {
          isValid = await checkImage(image.url);
        }
        return isValid ? index : null;
      })
    );

    return validImageIndexes;
  };
  if (isMatchingPair) {
    let validAllData: any[] = [];

    for (const imageMatchPair of images) {
      const validData = await getValidImageIndexes(imageMatchPair);
      validAllData.push(
        validData
          .filter(index => index !== null)
          .map((index: any) => imageMatchPair[index])
      );
    }

    // Ensure that the state is updated once after processing all images
    if (validAllData.length > 0) {
      setValidImages(validAllData);
    }
  } else {
    let validData = await getValidImageIndexes(images);
    setValidImages(
      validData
        .filter(index => index !== null)
        .map((items: any) => images[items])
    );
  }
}

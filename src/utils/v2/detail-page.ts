export const getShapeDisplayName = (value = '') => {
  const shapesMapping: Record<string, string> = {
    EM: 'Emerald',
    BR: 'Round',
    PR: 'Pear',
    PS: 'Princess',
    AS: 'Asscher',
    RAD: 'Radiant',
    OV: 'Oval',
    CU: 'Cushion',
    MQ: 'Marquise',
    HS: 'Heart'
  };

  return shapesMapping[value] || value;
};

export const handleDownloadImage = (imageUrl = '') => {
  if (imageUrl) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image_${imageUrl}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

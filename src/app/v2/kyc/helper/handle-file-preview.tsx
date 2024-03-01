import Image from 'next/image';
function bytesToMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(3); // Keep it rounded to 3 decimal places
}

import pdf from '@public/assets/icons/pdf.svg';

export const handlePreview = ({
  setIsModalOpen,
  setModalContent,
  selectedFile
}: any) => {
  setIsModalOpen(true);
  setModalContent(
    <>
      {selectedFile.map((file: any) => {
        const path = file.path;
        const fileExtension = path.slice(
          ((path.lastIndexOf('.') - 1) >>> 0) + 2
        );

        return (
          <>
            <div className="flex w-[40vw] h-[60vh]">
              {file.type === 'application/pdf' ? (
                <iframe
                  src={URL.createObjectURL(file)}
                  style={{ width: '40vw', height: '60vh' }}
                  title="PDF Preview"
                ></iframe>
              ) : fileExtension === ('docx' || 'doc') ? (
                ''
              ) : (
                <Image
                  key={file.name}
                  // src={file.preview}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-[60vh]"
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              {fileExtension === 'pdf' ? (
                <Image src={pdf} alt="pdf" width={24} height={24} />
              ) : (
                ''
              )}
              <p>
                {file.name} | {`${bytesToMB(file.size)}MB`}
              </p>
            </div>
          </>
        );
      })}
    </>
  );
};

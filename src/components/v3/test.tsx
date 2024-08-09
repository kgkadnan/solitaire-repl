'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AirpodsScrollAnimationNew: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const airpodsRef = useRef<{ frame: number }>({ frame: 0 });
  const frameCount = 420;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = 1100; //1158
    canvas.height = 680; //770

    const currentFrame = (index: number): string =>
      // https://csg1003200332b85b56.blob.core.windows.net/landing-page-assets/World_Animation_Backup2_gv005_-Camera_0043.png
      `https://csg1003200332b85b56.blob.core.windows.net/landing-page-assets/World_Animation_Backup2_gv005_-Camera_${(
        index + 22
      )
        .toString()
        .padStart(
          4,
          '0'
        )}.png?sv=2023-11-03&spr=https&st=2024-06-03T11%3A48%3A44Z&se=2029-07-07T11%3A48%3A44Z&sr=b&sp=r&sig=5%2FkeLmU5GMPtUvdijxthG7P5XeuT6JKciXV7bn6VFJ8%3D`;
    // `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current.push(img);
    }

    gsap.to(airpodsRef.current, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: canvas,
        start: 'top top',
        end: () => `+=${(canvas.height * frameCount) / 2}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1
      },
      onUpdate: render
    });

    imagesRef.current[0].onload = render;

    function render() {
      if (!context) return;
      context.clearRect(0, 0, canvas?.width!, canvas?.height!);
      context?.drawImage(imagesRef.current[airpodsRef.current.frame], 0, 0);
    }

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className=" ">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default AirpodsScrollAnimationNew;

// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import {
//   StorageSharedKeyCredential,
//   BlobServiceClient,
//   generateBlobSASQueryParameters,
//   SASProtocol,
//   BlobSASPermissions
// } from '@azure/storage-blob';

// gsap.registerPlugin(ScrollTrigger);

// const generateSASToken = async (
//   container: string,
//   fileKey: string,
//   expiresInSeconds: any
// ) => {
//   try {
//     const sharedCreds = new StorageSharedKeyCredential(
//       'csg1003200332b85b56.blob.core.windows.net',
//       'KGK_DEV'
//     );
//     const containerClient = new BlobServiceClient(
//       `https://csg1003200332b85b56.blob.core.windows.net`,
//       sharedCreds
//     ).getContainerClient(container);
//     const blobClient = containerClient.getBlobClient(fileKey);
//     const protocol = SASProtocol.Https;
//     const sasOptions = {
//       containerName: container,
//       blobName: fileKey,
//       startsOn: new Date(),
//       expiresOn: new Date(new Date().valueOf() + expiresInSeconds * 1000),
//       permissions: BlobSASPermissions.parse('r'),
//       protocol: protocol
//     };
//     const sasToken = generateBlobSASQueryParameters(
//       sasOptions,
//       sharedCreds
//     ).toString();
//     console.log(sasToken, 'sasTokensasToken');
//     return `${blobClient.url}?${sasToken}`;
//   } catch (error) {
//     console.error('Error generating SAS token', error);
//     return '';
//   }
// };

// const AirpodsScrollAnimationNew: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const imagesRef = useRef<HTMLImageElement[]>([]);
//   const airpodsRef = useRef<{ frame: number }>({ frame: 0 });
//   const frameCount = 420;
//   const [sasToken, setSasToken] = useState<string>('');

//   useEffect(() => {
//     // Generate SAS token
//     const generateToken = async () => {
//       const token = await generateSASToken(
//         'landing-page-assets',
//         'World_Animation_Backup2_gv005_-Camera_0043.png',
//         3600
//       );
//       setSasToken(token);
//     };
//     generateToken();
//   }, []);

//   useEffect(() => {
//     if (!sasToken) return; // Wait until SAS token is generated

//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const context = canvas.getContext('2d');
//     if (!context) return;

//     canvas.width = 1100; //1158
//     canvas.height = 680; //770

//     const currentFrame = (index: number): string =>
//       `https://csg1003200332b85b56.blob.core.windows.net/landing-page-assets/World_Animation_Backup2_gv005_-Camera_${(
//         index + 22
//       )
//         .toString()
//         .padStart(4, '0')}.png?${sasToken}`;

//     for (let i = 0; i < frameCount; i++) {
//       const img = new Image();
//       img.src = currentFrame(i);
//       imagesRef.current.push(img);
//     }

//     gsap.to(airpodsRef.current, {
//       frame: frameCount - 1,
//       snap: 'frame',
//       ease: 'none',
//       scrollTrigger: {
//         trigger: canvas,
//         start: 'top top',
//         end: () => `+=${(canvas.height * frameCount) / 2}`,
//         scrub: 0.5,
//         pin: true,
//         anticipatePin: 1
//       },
//       onUpdate: render
//     });

//     imagesRef.current[0].onload = render;

//     function render() {
//       if (!context) return;
//       context.clearRect(0, 0, canvas?.width!, canvas?.height!);
//       context.drawImage(imagesRef.current[airpodsRef.current.frame], 0, 0);
//     }

//     return () => {
//       // Cleanup ScrollTrigger instances
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, [sasToken]); // Run effect when SAS token is updated

//   return (
//     <div>
//       <canvas ref={canvasRef} />
//     </div>
//   );
// };

// export default AirpodsScrollAnimationNew;

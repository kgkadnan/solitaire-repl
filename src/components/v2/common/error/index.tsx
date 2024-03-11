import Image from 'next/image';
import React from 'react';
import unicorn from '@public/v2/assets/images/error-unicorn.png';

const CustomErrorComponent: React.FC<any> = () => {
  return (
    <div className="min-h-[76vh] flex flex-col items-center justify-center bg-solitaireSecondary-200">
      <div className="bg-solitaireSecondary p-8 rounded shadow-lg text-center">
        <h1 className="text-4xl text-purple-600 font-bold">
          Uh-oh! An Error Occurred
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Looks like a unicorn ate this page.
        </p>
        <Image
          src={unicorn}
          alt="Funny Unicorn"
          className="w-32 h-32 mt-6"
          width={100}
          height={100}
        />
        <button
          className="bg-solitaireSecondary-500 hover:bg-pink-600 text-white font-semibold rounded-full py-2 px-6 mt-6 transition duration-300"
          onClick={() => window.location.reload()}
        >
          Give Me Back My Page!
        </button>
      </div>
    </div>
  );
};

export default CustomErrorComponent;

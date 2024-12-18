'use client';
import ActionButton from '@/components/v2/common/action-button';
import CommonHeader from '@/components/v3/navigation-menu/header';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function NotFound() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const router = useRouter();
  const handleGoHome = () => {
    try {
      const auth = localStorage.getItem('auth');
      const isLoggedIn = auth ? JSON.parse(auth) : false;
      if (isLoggedIn) {
        router.push('/v2');
      } else {
        router.push('/v2/login');
      }
    } catch (error) {
      console.error('Failed to navigate:', error);
    }
  };

  useEffect(() => {
    try {
      const auth = localStorage.getItem('auth');
      const isLoggedIn = auth ? JSON.parse(auth) : false;
      if (isLoggedIn) {
        setIsClient(false);
        router.push('/v2');
      }
    } catch (error) {
      console.error('Failed to navigate:', error);
    }
  }, []);

  return (
    <>
      {isClient ? (
        <>
          <CommonHeader />
          <div className="flex flex-col items-center justify-center min-h-screen gap-[30px] text-center px-4">
            {/* 404 Icon SVG */}
            <svg
              width="276"
              height="107"
              viewBox="0 0 276 107"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-full h-auto sm:w-3/4 md:w-1/2 lg:w-1/3"
            >
              <path
                d="M0 85.9219V68.8477L42.8107 1.40199H57.5316V25.0355H48.8192L21.831 67.7461V68.5472H82.6673V85.9219H0ZM49.2198 103.947V80.7145L49.6204 73.1538V1.40199H69.9492V103.947H49.2198Z"
                fill="#475467"
              ></path>
              <path
                d="M192.636 85.9219V68.8477L235.446 1.40199H250.167V25.0355H241.455L214.467 67.7461V68.5472H275.303V85.9219H192.636ZM241.856 103.947V80.7145L242.256 73.1538V1.40199H262.585V103.947H241.856Z"
                fill="#475467"
              ></path>
              <mask
                id="mask0_18635_24995"
                maskUnits="userSpaceOnUse"
                x="82"
                y="0"
                width="111"
                height="110"
              >
                <path d="M82.6514 0H192.651V110H82.6514V0Z" fill="white"></path>
              </mask>
              <g mask="url(#mask0_18635_24995)">
                <path
                  d="M89.5264 47.025L103.001 18.15L116.476 47.025H89.5264Z"
                  fill="#9A9FB8"
                ></path>
                <path
                  d="M103.001 18.15H137.651L116.476 47.025L103.001 18.15Z"
                  fill="#C6CCE0"
                ></path>
                <path
                  d="M185.777 47.025L172.302 18.15L158.827 47.025H185.777Z"
                  fill="#9A9FB8"
                ></path>
                <path
                  d="M172.301 18.15H137.651L158.826 47.025L172.301 18.15ZM116.476 47.025L137.651 93.0875L89.5264 47.025H116.476Z"
                  fill="#C6CCE0"
                ></path>
                <path
                  d="M158.826 47.025L137.651 93.0875L185.776 47.025H158.826Z"
                  fill="#787B94"
                ></path>
                <path
                  d="M116.476 47.025H158.826L137.651 18.15L116.476 47.025Z"
                  fill="#ECF0FA"
                ></path>
                <path
                  d="M116.476 47.025L137.651 93.0875L158.826 47.025H116.476Z"
                  fill="#9A9FB8"
                ></path>
              </g>
            </svg>
            {/* Page Not Found Title */}
            <div className="relative tracking-[0.16em] uppercase font-medium text-[#475467] text-2xl sm:text-3xl md:text-4xl">
              Page Not Found!
            </div>
            {/* Message */}
            <div className="relative text-[16px] sm:text-[18px] font-medium text-center inline-block w-full sm:w-3/4 lg:w-1/2 text-[#475467]">
              Sorry, but the page you are looking for does not exist, has been
              removed, name changed, or is temporarily unavailable.
            </div>
            {/* Button to Go to Home */}
            <div className="action-button_ctaContainer___JSuJ">
              <div className="undefined">
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: 'Go to Homepage',
                      handler: handleGoHome
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}

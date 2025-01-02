import Avatar from '@public/v2/assets/icons/dashboard/avatar.svg?url';
import Image from 'next/image';

import Phone from '@public/v2/assets/icons/dashboard/phone.svg?url';
import Location from '@public/v2/assets/icons/dashboard/location.svg?url';
import WhatsApp from '@public/v2/assets/icons/dashboard/whatsapp.svg?url';
import Mail from '@public/v2/assets/icons/dashboard/mail.svg?url';
import Copy from '@public/v2/assets/icons/dashboard/copy.svg?url';
import { Toast } from '../copy-and-share/toast';
import { useState } from 'react';
import { RednderLocation } from '../data-table/helpers/render-cell';
import { STONE_LOCATION_SHORT } from '@/constants/v2/enums/location';

interface IKAMCardProps {
  name: string;
  role: string;
  phoneNumber: string;
  email: string;
  image?: string | null;
  location: string;
}

const styles = {
  background: `
    linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, white 100%),
    linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 50%)
  `,
  backdropFilter: 'blur(40px)'
};

const KAMCard: React.FC<IKAMCardProps> = ({
  name,
  role,
  phoneNumber,
  email,
  image,
  location
}) => {
  const [showToast, setShowToast] = useState(false);
  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setShowToast(true); // Show the toast notification
    setTimeout(() => {
      setShowToast(false); // Hide the toast notification after some time
    }, 4000);
  };

  return (
    <>
      <Toast show={showToast} message="Copied Successfully" />

      <div
        className="w-[300px] h-[400px] rounded-[8px] border-[1px] border-primaryBorder flex flex-col gap-[24px]"
        style={{ boxShadow: 'var(--input-shadow)' }}
      >
        <div
          style={styles}
          className="w-[100%]  rounded-[8px] flex justify-center"
        >
          <div className="mt-[24px]">
            {image && image !== null && image !== '' ? (
              <div
                className="h-30 w-30 relative"
                style={{ width: '120px', height: '120px' }}
              >
                <Image
                  src={image}
                  alt="kam image"
                  className="object-cover rounded-[8px]"
                  layout="fill"
                />
              </div>
            ) : (
              <Avatar />
            )}{' '}
          </div>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <h3 className="text-headingM medium text-neutral900">{name}</h3>
          <div className="text-lRegular  text-neutral900 ">
            <span>{role}</span>
          </div>

          <div className="parent relative">
            <hr className=" bottom-0 left-0 border-none h-[1px] w-[250px] bg-neutral200" />
          </div>
          <div className="flex flex-col gap-[14px] text-mRegular text-neutral600">
            <div className="flex gap-[13px] items-center">
              <Location />
              <div>
                {RednderLocation({
                  renderedCellValue:
                    STONE_LOCATION_SHORT[
                      location as keyof typeof STONE_LOCATION_SHORT
                    ]
                })}
              </div>
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <a href={`tel:${phoneNumber}`}>
                {' '}
                <Phone />
              </a>

              <a
                aria-label="Chat on WhatsApp"
                href={`https://wa.me/${phoneNumber?.replace(/\s+/g, '') || ''}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                <WhatsApp />
              </a>
              <span className="">{phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2  cursor-pointer">
              <a href={`mailto:${email}`} className="flex gap-2 items-center">
                {' '}
                <Mail /> <span className="">{email}</span>{' '}
              </a>
              <div onClick={() => handleCopy(email)}>
                {' '}
                <Copy />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KAMCard;

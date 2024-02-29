import Image from 'next/image';
import ArrivalIcon from '@public/v2/assets/icons/sidebar-icons/new-arrivals.svg?url';

interface IContactCardProps {
  name: string;
  role: string;
  phoneNumber: string;
  email: string;
}

const ContactCard: React.FC<IContactCardProps> = ({
  name,
  role,
  phoneNumber,
  email
}) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col items-center pb-10">
        <Image
          src="/default-avatar.png"
          alt="avatar"
          width={60}
          height={60}
          className="mb-3"
        />
        <h3 className="mb-1 text-xl font-medium text-gray-900">{name}</h3>
        <span className="text-sm text-gray-500">{role}</span>
        <div className="flex items-center mt-4 text-gray-700">
          <ArrivalIcon className="h-5 w-5" />
          <span className="ml-4">{phoneNumber}</span>
        </div>
        <div className="flex items-center mt-2 text-gray-700">
          <ArrivalIcon className="h-5 w-5" />
          <span className="ml-4">{email}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

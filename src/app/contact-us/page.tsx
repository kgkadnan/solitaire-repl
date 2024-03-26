import Image from 'next/image';
import Ind from '@public/v2/assets/png/data-table/IND.png';
import Usa from '@public/v2/assets/png/data-table/USA.png';
import Bel from '@public/v2/assets/png/data-table/BEL.png';

const ContactUs = () => {
  const contactData = [
    {
      flag: Ind,
      country: 'INDIA',
      companyName: 'KGK Diamonds (I) Pvt. Ltd',
      address:
        'DE 4011 to 4016, Tower D, Bharat Diamond Bourse, Bandra Kurla Complex-Bandra East, Mumbai - 400051',
      phone: '+91 22 4079 9994',
      mail: 'sales.mumbai2@kgkmail.com'
    },

    {
      flag: Bel,
      country: 'BELGIUM',
      companyName: 'KGK DIAMONDS BV',
      address:
        'Hoveniersstraat No. 2, Suit No. 708, 901 Box No 433, 2018 Antwerp, Belgium.',
      phone: '+32 32131157',
      mail: 'kgk.live@kgkmail.com'
    },
    {
      flag: Usa,
      country: 'USA',
      companyName: 'Sparkle Gems Inc.',
      address: '20 W 47th St #1101, New York, NY 10036, United States',
      phone: '+1 212-279-1312',
      mail: 'kgk.live@kgkmail.com'
    }
  ];
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-headingS font-medium text-neutral-900">Contact Us</h1>
      <div className="flex gap-6">
        {contactData.map(data => (
          <div
            className="w-[300px] border-[1px] border-neutral200 rounded-[8px] p-2 flex flex-col gap-2"
            key={data.companyName}
          >
            <div className="flex gap-2">
              <Image src={data.flag} alt={data.country} />{' '}
              <p className="text-neutral900">{data.country}</p>
            </div>
            <p className="text-neutral900 bold">{data.companyName}</p>
            <a href={`tel:${data.phone}`} className="flex gap-2">
              {' '}
              <p className="font-regular text-mRegular text-neutral600">
                {data.phone}
              </p>
            </a>
            <a href={`mailto:${data.mail}`} className="flex gap-2">
              <p className="font-regular text-mRegular text-neutral600">
                {data.mail}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;

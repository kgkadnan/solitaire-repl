import India from '@public/v3/flags/india.svg';
import Belgium from '@public/v3/flags/belgium.svg';
import NorthAmerica from '@public/v3/flags/north-america.svg';
import Dubai from '@public/v3/flags/dubai.svg';

export const sitemap = [
  {
    title: 'Company',
    content: [
      {
        data: 'About us',
        link: '/v3/about-us/our-story',
        isNew: false
      },
      {
        data: 'Leadership',
        link: '/v3/about-us/leadership',
        isNew: false
      },
      {
        data: 'Sustainability',
        link: '/v3/sustainability',
        isNew: false
      }
    ]
  },
  {
    title: 'Resources',
    content: [
      {
        data: 'Blog',
        link: '/v3/blogs',
        isNew: false
      }
    ]
  },
  {
    title: 'Legal',
    content: [
      {
        data: 'Terms & Conditions',
        link: '/terms-and-conditions',
        isNew: false
      },
      {
        data: 'Privacy Policy',
        link: '/privacy-policy',
        isNew: false
      }
    ]
  }
];
export const officeLocation = [
  {
    address: `DE-4011, D Tower 4th Floor,
Bharat Diamonds Bourse,
Bandra Kurla Complex,
Bandra East, Mumbai - 400051`,
    phone: '+91-9892421286',
    email: 'ajay.ghiya@kgkmail.com',
    flag: India
  },
  {
    address: '36 J, Almas Tower, Cluster I, JLT, Dubai',
    phone: '+32-486042074',
    email: 'hasmukh.ramani@kgkmail.com',
    flag: Dubai
  },
  {
    address: '20 W 47th St #1101, New York, NY 10036, USA',
    phone: '+1-642885207',
    email: 'moshe.isakov@kgkmail.com',
    flag: NorthAmerica
  },
  {
    address: '708, Hovenierstraat 2, Antwerp 2018, Country - Belgium',
    phone: '+32-486042073',
    email: 'devanshu.jain@kgkmail.com',
    flag: Belgium
  }
];

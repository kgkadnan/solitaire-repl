//Gem Trac Imports
import step1 from '@public/v3/traceability/gem-trac/step-1.png';
import step2 from '@public/v3/traceability/gem-trac/step-2.png';
import step3 from '@public/v3/traceability/gem-trac/step-3.png';
import step4 from '@public/v3/traceability/gem-trac/step-4.png';
import step5 from '@public/v3/traceability/gem-trac/step-5.png';
import step6 from '@public/v3/traceability/gem-trac/step-6.png';

import url1 from '@public/v3/traceability/gem-trac/diamond.webp';
import url2 from '@public/v3/traceability/gem-trac/hrd.webp';
import url3 from '@public/v3/traceability/gem-trac/map.webp';
import url4 from '@public/v3/traceability/gem-trac/micro.webp';
import polGif from '@public/v3/traceability/gem-trac/pol.gif';
import lsGif from '@public/v3/traceability/gem-trac/LS.gif';

export const gemTracAnchorLink = [
  'origin',
  'Architecture',
  'Laser Cutting',
  'Crafting',
  'Grooming',
  'Certification'
];

export const GemTrac = [
  {
    id: 'origin',
    header: 'Origin',
    title: 'TANZANIA / AFRICA',
    description: `The origin of a diamond is delivered to the manufacturer by a miner or rough trader via a Kimberley Process Certificate. On receipt of the rough parcel, an opening photo is taken and encrypted on a secure cloud server.`,

    chosenBy: 'MR DINESH KOTHARI', // Person who made the choice
    details: `Each rough diamond is analyzed by a rough assortment expert with years of experience and assigned an Unique Identification (UID). The real time information with the rough diamond video is also encrypted on a secure cloud server.`,
    url: url3,
    icon: step1,
    metadata: []
  },
  {
    id: 'Architecture',
    header: 'Architected by',
    title: 'MANOHER PEDNEKAR',
    description: `The impurities of the UID assigned rough diamond are plotted with the help of advanced technology. An expert plans the best possible polished diamond that can be cut from the rough and is recorded on a secure cloud server.`,
    chosenBy: '',
    details: ``,
    url: url1,
    icon: step2,
    metadata: [
      {
        key: 'Round',
        value: 'Shape'
      },
      {
        key: 'EX-EX-EX',
        value: 'Cut'
      },
      {
        key: '1.2',
        value: 'Carat'
      },
      {
        key: 'VS2',
        value: 'Clarity'
      },
      {
        key: 'D',
        value: 'Color'
      }
    ]
  },
  {
    id: 'Laser Cutting',
    header: 'Laser Cut by',
    title: 'TIMIR DESAI ',
    description: `A precise and powerful laser beam is set on the planned markings on the diamond by an expert. The laser divides the rough diamond into two and are forwarded to the faceting department.`,
    chosenBy: '', // Person who made the choice
    details: ``,
    url: polGif,
    icon: step3,
    metadata: [
      {
        key: 'Round',
        value: 'Shape'
      },
      {
        key: 'EX-EX-EX',
        value: 'Cut'
      },
      {
        key: '1.2',
        value: 'Carat'
      },
      {
        key: 'VS2',
        value: 'Clarity'
      },
      {
        key: 'D',
        value: 'Color'
      }
    ]
  },
  {
    id: 'Crafting',
    header: 'Crafted by',
    title: 'SHAILESH D GONDALIYA',
    description: `An Artisan facets the rough diamond on a polishing metal wheel rotating at 3600 RPMs. Based on the planning, the Artisan gives life to the uneven piece of carbon; information of which is then embedded on a secure cloud server.`,

    chosenBy: '', // Person who made the choice
    details: ``,
    url: lsGif,
    icon: step4,
    metadata: [
      {
        key: 'Round',
        value: 'Shape'
      },
      {
        key: 'EX-EX-EX',
        value: 'Cut'
      },
      {
        key: '1.2',
        value: 'Carat'
      },
      {
        key: 'VS2',
        value: 'Clarity'
      },
      {
        key: 'D',
        value: 'Color'
      }
    ]
  },

  {
    id: 'Grooming',
    header: 'Groomed by',
    title: 'KANTILAL PRAJAPATI',
    description: `An experienced diamond grader evaluates 50 parameters beyond the 4Cs in a polished diamond to assign a grade. Any faceting issues are sent back for correction. Below are the final grades given by the Quality Check Artisan.`,
    chosenBy: '', // Person who made the choice
    details: ``,
    url: url4,
    icon: step5,
    metadata: [
      {
        key: 'Round',
        value: 'Shape'
      },
      {
        key: 'EX-EX-EX',
        value: 'Cut'
      },
      {
        key: '1.2',
        value: 'Carat'
      },
      {
        key: 'VS2',
        value: 'Clarity'
      },
      {
        key: 'D',
        value: 'Color'
      }
    ]
  },
  {
    id: 'Certification',
    header: 'Certified by',
    title: 'CGL',
    description: `Diamonds are polished and graded around the world by different institutes. The laboratories use high magnification instruments and various tests to determine the diamond quality or any treatment. Authentication gives you the confidence and peace of mind in purchasing.`,

    chosenBy: '', // Person who made the choice
    details: ``,
    url: url2,
    icon: step6,
    metadata: [
      {
        key: 'Round',
        value: 'Shape'
      },
      {
        key: 'EX-EX-EX',
        value: 'Cut'
      },
      {
        key: '1.2',
        value: 'Carat'
      },
      {
        key: 'VS2',
        value: 'Clarity'
      },
      {
        key: 'D',
        value: 'Color'
      },
      {
        key: 'DMO8645',
        value: 'Report No'
      }
    ]
  }
];

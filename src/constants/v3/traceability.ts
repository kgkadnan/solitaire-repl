import Trace1 from '@public/v3/traceability/ethical.svg';
import Trace2 from '@public/v3/traceability/transparency.svg';
import Trace3 from '@public/v3/traceability/quality.svg';
import Trace4 from '@public/v3/traceability/environment.svg';
import Program1 from '@public/v3/traceability/program1.png';
import Program2 from '@public/v3/traceability/program2.png';
import Program3 from '@public/v3/traceability/program3.png';
import Program4 from '@public/v3/traceability/program4.png';
import Program5 from '@public/v3/traceability/program5.png';
import Program6 from '@public/v3/traceability/program6.png';

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

export const traceabilityMatters = [
  {
    icon: Trace1,
    heading: 'Ethical Sourcing',
    description:
      'Traceability confirms that diamonds are sourced from conflict-free regions, adhering to ethical labor practices. This helps in preventing the circulation of "blood diamonds" which are often associated with human rights abuses and conflict financing.'
  },
  {
    icon: Trace2,
    heading: 'Transparency',
    description: `With traceability, every step of a diamond's journey is documented, providing transparency in the supply chain. This includes details on mining, cutting, polishing, and distribution, ensuring that consumers know exactly where their diamonds come from.`
  },
  {
    icon: Trace3,
    heading: 'Quality Assurance',
    description:
      'Traceability systems often include rigorous quality checks at each stage. This ensures that the diamonds meet high standards for quality and authenticity, giving businesses and consumers confidence in the product they are buying.'
  },
  {
    icon: Trace4,
    heading: 'Environmental Responsibility',
    description:
      'Companies committed to traceability are also often committed to sustainable practices. This includes minimizing environmental impact and supporting initiatives that benefit local communities in mining areas.'
  }
];

export const leadingPrograms = [
  // {
  //   icon: Program1,
  //   heading: 'GemTrac by KGK',
  //   description:
  //     'GemTrac by KGK features in-house traceability programs that document the manufacturing process and track each diamond’s journey from mines to market.',
  //   refLink: '/v3/traceability/gemtrac'
  // },

  {
    icon: Program3,
    heading: 'GIA Source Verification Service (SVS)',
    description: `GIA, a trusted gem institute, verifies the reported source country of polished diamonds using existing documents and audits participating manufacturers. This program boosts consumer confidence by adding a layer of verification. It relies on documentation accuracy, GIA SVS is a valuable step towards a more transparent diamond industry.`
  },
  {
    icon: Program4,
    heading: 'DB Origin & Origin Story by De Beers',
    description: `Origin Story is an extension of De Beers' broader Origin suite, which combines diamond traceability from source
(powered by TRACR) with information about the diamond's impact on people and the planet.
De Beers Origin Story goes beyond just providing basic traceability data. It aims to create a more engaging experience for retailers and ultimately, consumers.
`
  },

  {
    icon: Program5,
    heading: 'Sarine Diamond Journey',
    description: `At the mine, rough diamonds are registered using AutoScan™ Plus capturing their unique characteristics. In cutting and polishing stages, ownership and location information are updated within the Diamond Journey program. The diamond's journey continues to be tracked as it travels through wholesalers and retailers.
`
  },

  {
    icon: Program6,
    heading: 'Everledger',
    description: `Everledger uses blockchain technology to create a traceability program for diamonds, aiming to bring transparency & trust to the diamond industry. The program tracks a diamond's journey from mine to consumer, recording details like origin, characteristics, & ownership history on a secure blockchain ledger that creates an immutable record of the diamond's journey.`
  },
  {
    icon: Program2,
    heading: 'Tracr by De Beers',
    description: `TRACR is a leading traceability platform developed by De Beers Group. It utilizes a combination of technologies like blockchain, artificial intelligence, and the Internet of Things (IoT) to track a diamond's journey from mine to market.`
  }
];

export const traceabilityAnchorLink = [
  'origin',
  'Architecture',
  'Laser Cutting',
  'Crafting',
  'Grooming',
  'Certification'
];

export const traceabilityGemTrac = [
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

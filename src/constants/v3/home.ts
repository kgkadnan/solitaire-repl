import Icon1 from '@public/v3/home/icon1.png';
import Icon2 from '@public/v3/home/icon2.png';
import Icon3 from '@public/v3/home/icon3.png';
import Icon4 from '@public/v3/home/icon4.png';
import Icon5 from '@public/v3/home/icon5.png';

import Step1 from '@public/v3/home/trace-step-1.png';
import Step2 from '@public/v3/home/trace-step-2.png';
import Step3 from '@public/v3/home/trace-step-3.png';
import Step4 from '@public/v3/home/trace-step-4.png';
import Step5 from '@public/v3/home/trace-step-5.png';

export const traceabilityData = [
  {
    short: 'Rough Birth Registration',
    header1: 'Rough Birth Registration',
    data: [
      'Each rough diamond parcel is assigned a unique identification code upon receiving.',
      'This code is recorded in the ERP system, matching every detail with physical documentation.',
      'Each stone is converted into single packets, and each individual stone is assigned its own unique barcode ID.',
      'The barcode generation ensures that each stone can be individually tracked throughout the process.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Kimberley Process Certification', 'Invoice', 'Barcode ID'],
    icon: Icon1,
    indicator: Step1,
    timeStart: 0,
    timeEnd: 3
  },
  {
    short: 'Sorting & Planning',
    header1: `Rough Source Verification
(Sorting & Planning)`,
    data: [
      `The unique identification code links to each diamond throughout the sorting and planning processes. `,
      'Any splitting or division of rough diamonds is documented with weight updates, maintaining the unique identification in the system.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity'],
    icon: Icon2,
    indicator: Step2,
    timeStart: 3,
    timeEnd: 11
  },
  {
    short: `Sawing &
Laser cut`,
    header1: `Manufacturing Stage Validation
(Sawing - Laser cut)`,
    data: [
      'During manufacturing (cutting, bruting, polishing, etc.), each stage is recorded in the ERP system. ',
      'The system validates the status of each stone as it progresses, ensuring traceability with the unique identification code and weight logs. ',
      'Physical movements are also documented.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity', 'Cut'],
    icon: Icon3,
    indicator: Step3,
    timeStart: 11,
    timeEnd: 14
  },
  {
    short: `Final Plan
Registration`,
    header1: `Final Plan Registration
(Final shaping polishing)`,
    data: [
      'Once manufacturing is complete, the finished polished diamond is weighed and graded, with all details recorded in the ERP system. ',
      'The system captures multiple properties of the rough part and the planned polish to ensure they match.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity', 'Cut'],
    icon: Icon4,
    indicator: Step4,
    timeStart: 14,
    timeEnd: 27
  },
  {
    short: `Final Shaping &
polishing`,
    header1: `Final Plan Registration
(Final shaping & polishing)`,
    data: [
      'Before the final grading, each polished diamond undergoes a quality control check.',
      'The QC details are recorded in the ERP system, ensuring traceability and confirming that all manufacturing standards and specifications have been met.',
      'Videography of each stone with Unique ID.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity', 'Cut', 'QC details'],
    icon: Icon5,
    indicator: Step5,
    timeStart: 27,
    timeEnd: 30
  }
];

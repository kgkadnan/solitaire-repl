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
      'Each rough diamond parcel is assigned a unique identification code once taken under manufacturing floor.',
      'This code is recorded in the ERP system with the import document evidence.',
      'Unique identification number is assigned to each stone and entered in the ERP to track the stone in each process.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Kimberley Process Certification', 'Invoice', 'Barcode ID'],
    icon: Icon1,
    indicator: Step1,
    timeStart: 0,
    timeEnd: 3
  },
  {
    short: 'Scanning & Planning',
    header1: `Scanning & Planning`,
    data: [
      'Each stone is scanned in galaxy scanning machine.',
      'Scanned stone is planned on the 3D model with optimum value and entered in ERP.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity'],
    icon: Icon2,
    indicator: Step2,
    timeStart: 3,
    timeEnd: 11
  },
  {
    short: `Laser Cutting`,
    header1: `Laser Cutting`,
    data: [
      'The planned stone is then split as per the value and entered in ERP.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity', 'Cut'],
    icon: Icon3,
    indicator: Step3,
    timeStart: 11,
    timeEnd: 17
  },
  {
    short: `Plan Registration`,
    header1: `Plan Registration`,
    data: [
      'The split stones QC is done and the final registration of plan is done.',
      'The expected polished is registered against the unique code in ERP.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity', 'Cut'],
    icon: Icon4,
    indicator: Step4,
    timeStart: 17,
    timeEnd: 27
  },
  {
    short: `Shaping & Polishing`,
    header1: `Shaping & Polishing`,
    data: [
      'The shaping & polishing is done as per the plan registered.',
      'Pre & post shaping & planning details are entered in ERP.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity', 'Cut', 'QC details'],
    icon: Icon5,
    indicator: Step5,
    timeStart: 27,
    timeEnd: 31
  }
];

export const traceabilityData = [
  {
    header1: 'Rough Birth Registration',
    data: [
      'Each rough diamond parcel is assigned a unique identification code upon receiving.',
      'This code is recorded in the ERP system, matching every detail with physical documentation.',
      'Each stone is converted into single packets, and each individual stone is assigned its own unique barcode ID.',
      'The barcode generation ensures that each stone can be individually tracked throughout the process.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Kimberley Process Certification', 'Invoice', 'Barcode ID'],
    icon: 'tets',
    timeStart: 0,
    timeEnd: 2
  },
  {
    header1: `Rough Source Verification
(Sorting & Planning)`,
    data: [
      `The unique identification code links to each diamond throughout the sorting and planning processes. `,
      'Any splitting or division of rough diamonds is documented with weight updates, maintaining the unique identification in the system.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity'],
    icon: 'tets',
    timeStart: 2,
    timeEnd: 10
  },
  {
    header1: `Manufacturing Stage Validation
(Sawing - Laser cut)`,
    data: [
      'During manufacturing (cutting, bruting, polishing, etc.), each stage is recorded in the ERP system. ',
      'The system validates the status of each stone as it progresses, ensuring traceability with the unique identification code and weight logs. ',
      'Physical movements are also documented.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity', 'Cut'],
    icon: 'tets',
    timeStart: 10,
    timeEnd: 13
  },
  {
    header1: `Final Plan Registration
(Final shaping polishing)`,
    data: [
      'Once manufacturing is complete, the finished polished diamond is weighed and graded, with all details recorded in the ERP system. ',
      'The system captures multiple properties of the rough part and the planned polish to ensure they match.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity', 'Cut'],
    icon: 'tets',
    timeStart: 13,
    timeEnd: 26
  },
  {
    header1: `Final Plan Registration
(Final shaping polishing)`,
    data: [
      'Before the final grading, each polished diamond undergoes a quality control check.',
      'The QC details are recorded in the ERP system, ensuring traceability and confirming that all manufacturing standards and specifications have been met.',
      'Videography of each stone with Unique ID.'
    ],
    header2: 'Data Uploaded to ERP',
    tags: ['Carat', 'Color', 'Shape', 'Clarity', 'Cut', 'QC details'],
    icon: 'tets',
    timeStart: 26,
    timeEnd: 29
  }
];

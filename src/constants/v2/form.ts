import Round from '@public/v2/assets/images/shape-round.svg';
import Pear from '@public/v2/assets/images/shape-pear.svg';
import Emerald from '@public/v2/assets/images/shape-emerald.svg';
import Asscher from '@public/v2/assets/images/shape-asscher.svg';
import Cushion from '@public/v2/assets/images/shape-cushion.svg';
import Marquise from '@public/v2/assets/images/shape-marquise.svg';
import Oval from '@public/v2/assets/images/shape-oval.svg';
import Radiant from '@public/v2/assets/images/shape-radiant.svg';
import Heart from '@public/v2/assets/images/shape-heart.svg';
import Others from '@public/v2/assets/images/shape-others.svg';
import Princess from '@public/v2/assets/images/shape-princess.svg';
import All from '@public/v2/assets/images/shape-all.svg';

export const shape = [
  {
    title: 'Round',
    short_name: 'BR',
    src: Round
  },
  {
    title: 'Pear',
    short_name: 'PS',
    src: Pear
  },
  {
    title: 'Emerald',
    short_name: 'EM',
    src: Emerald
  },
  {
    title: 'Asscher',
    short_name: 'AS',
    src: Asscher
  },
  {
    title: 'Cushion',
    short_name: 'CU',
    src: Cushion
  },
  {
    title: 'Radiant',
    short_name: 'RAD',
    src: Radiant
  },
  {
    title: 'Princess',
    short_name: 'PR',
    src: Princess
  },
  {
    title: 'Oval',
    short_name: 'OV',
    src: Oval
  },
  {
    title: 'Marquise',
    short_name: 'MQ',
    src: Marquise
  },

  {
    title: 'Heart',
    short_name: 'HS',
    src: Heart
  },

  {
    title: 'Others',
    short_name: 'OTHER',
    src: Others
  },
  {
    title: 'All',
    short_name: 'All',
    src: All
  }
];

export const anchor = [
  'Shape',
  'Carat',
  'Color',
  'Clarity',
  'Make Cut Polish Symmetry',
  'Fluorescence',
  'Lab',
  'Location',
  'Country of Origin',
  'Shade',
  'Discount% Price/Ct Amount Range',
  'Parameters',
  'Girdle',
  'Culet',
  'Inclusions',
  'Key to Symbol'
];

export const white = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N-Z'];

export const color = [
  {
    label: 'White',
    value: 'white'
  },
  {
    label: 'Fancy',
    value: 'fancy'
  }
];

export const clarity = [
  'FL',
  'IF',
  'VVS1',
  'VVS2',
  'VS1',
  'VS2',
  'SI1',
  'SI2',
  'SI3',
  'I1',
  'I2',
  'I3'
];

export const fluorescence = [
  { title: 'None', short_name: 'NON' },
  { title: 'Very Slight', short_name: 'VSL' },
  { title: 'Slight', short_name: 'SLT' },
  { title: 'Faint', short_name: 'FNT' },
  { title: 'Medium', short_name: 'MED' },
  { title: 'Strong', short_name: 'STG' },
  { title: 'Very Strong', short_name: 'VSTG' }
];
export const lab = [
  'GIA',
  'GIA DOR',
  'DBIOD',
  'FM',
  'HRD',
  'IGI',
  'NGTC',
  'KGK GRADING'
];
export const location = [
  { title: 'Belgium', short_name: 'BEL' },
  { title: 'Dubai', short_name: 'DUB' },
  { title: 'India', short_name: 'IND' },
  { title: 'Israel', short_name: 'ISR' },
  { title: 'USA', short_name: 'USA' }
];
export const countryOfOrigin = [
  'Angola',
  'Botswana',
  'Canada',
  'DEBEERS',
  'Namibia',
  'South Africa',
  'Any source'
];

export const keyToSymbol = [
  'All',
  'Bearding',
  'Brown patch of color',
  'Bruise',
  'Cavity',
  'Chip',
  'Cleavage',
  'Cloud',
  'Crystal',
  'Crystal Surface',
  'Etch Channel',
  'Extra Facet',
  'Feather',
  'Flux Remnant',
  'Indented Natural',
  'Internal Graining',
  'Internal Inscription',
  'Internal Laser Drilling',
  'Knot',
  'Laser Drill Hole',
  'Manufacturing Remnant',
  'Minor Details of Polish',
  'Natural',
  'Needle',
  'No Inclusion',
  'Pinpoint',
  'Reflecting Surface Graining',
  'Surface Graining',
  'Twinning Wisp'
];

export const shade = [
  'None',
  'White',
  'Mixed',
  'Yellow',
  'Brown',
  'Faint Brown',
  'Green',
  'Faint Green',
  'Grey',
  'Black',
  'Pink',
  'Blue',
  'Light Brown',
  'Very Light Brown'
];

export const make = ['3EX', '3EX+NON', '3VG+EX', '3G', '3F'];
export const cut = [
  { title: 'Excellent', short_name: 'EX' },
  { title: 'Very Good', short_name: 'VG' },
  { title: 'Good', short_name: 'G' },
  { title: 'Fair', short_name: 'F' }
];
export const polish = [
  { title: 'Excellent', short_name: 'EX' },
  { title: 'Very Good', short_name: 'VG' },
  { title: 'Good', short_name: 'G' },
  { title: 'Fair', short_name: 'F' }
];
export const symmetry = [
  { title: 'Excellent', short_name: 'EX' },
  { title: 'Very Good', short_name: 'VG' },
  { title: 'Good', short_name: 'G' },
  { title: 'Fair', short_name: 'F' }
];

export const fancy = [
  'Yellow',
  'Pink',
  'Blue',
  'Red',
  'Green',
  'Purple',
  'Orange',
  'Black',
  'Gray',
  'Violet',
  'Brown',
  'Other'
];

export const girdle = [
  
  {short_name:'ETN',title:"Extremely Thin"},
  {short_name:'VTN',title:"Very Thin"},
  {short_name:'STN',title:"Slightly Thin"},
  {short_name:'THN',title:"Thin"},
  {short_name:'MED',title:"Medium"},
  {short_name:'STK',title:"Slightly Thick"},
  {short_name:'THK',title:"Thick"},
  {short_name:'VTK',title:"Very Thick"},
  {short_name:'ETK',title:"Extremely Thick"},
];

export const culet = [
  'None',
  'Pointed',
  'Very Small',
  'Small',
  'Medium',
  'Large'
];

export const intensity = [
  'Faint',
  'Very Light',
  'Light',
  'Fancy',
  'Fancy Light',
  'Fancy Dark',
  'Fancy Intense',
  'Fancy Vivid',
  'Fancy Deep'
];

export const overtone = [
  'None',
  'Yellow',
  'Yellowish',
  'Pink',
  'Pinkish',
  'Blue',
  'Bluish',
  'Red',
  'Reddish',
  'Green',
  'Greenish',
  'Purple',
  'Purplish',
  'Orange',
  'Orangy',
  'Grey',
  'Greyish',
  'Black',
  'Brown',
  'Brownish',
  'Violetish',
  'Light Brown',
  'Brownish Orangy'
];
export const parameter = [
  {
    label: 'Table %',
    range: {
      gte: 0,
      lte: 100
    }
  },
  {
    label: 'Depth %',
    range: {
      gte: 0,
      lte: 100
    }
  },
  {
    label: 'Ratio',
    range: {
      gte: 0,
      lte: 100
    }
  },
  {
    label: 'Length',
    range: {
      gte: 0,
      lte: 100
    }
  },
  {
    label: 'Width',
    range: {
      gte: 0,
      lte: 100
    }
  },
  {
    label: 'Depth',
    range: {
      gte: 0,
      lte: 100
    }
  },
  {
    label: 'Crown Angle',
    range: {
      gte: 0,
      lte: 360
    }
  },
  {
    label: 'Crown Height',
    range: {
      gte: 0,
      lte: 100
    }
  },
  {
    label: 'Girdle %',
    range: {
      gte: 0,
      lte: 100
    }
  },
  {
    label: 'Pavilion Angle',
    range: {
      gte: 0,
      lte: 360
    }
  },
  {
    label: 'Pavilion Height',
    range: {
      gte: 0,
      lte: 100
    }
  },

  {
    label: 'Lower Half',
    range: {
      gte: 0,
      lte: 100
    }
  },

  {
    label: 'Star Length',
    range: {
      gte: 0,
      lte: 100
    }
  },

  {
    label: 'Girdle',
    range: {
      gte: 0,
      lte: 100
    }
  }
];
export const otherParameter = [
  {
    key: 'Black Inclusion',
    value: [
      {
        elementKey: 'Black Table',
        elementValue: ['B0', 'BPP', 'B1', 'B2', 'B3']
      },
      {
        elementKey: 'Side Table',
        elementValue: ['SB0', 'SBPP', 'SB1', 'SB2', 'SB3']
      },
      {
        elementKey: 'Open Crown',
        elementValue: ['N', 'VS', 'S', 'M', 'L']
      },
      {
        elementKey: 'Open Table',
        elementValue: ['N', 'VS', 'S', 'M', 'L']
      },
      {
        elementKey: 'Open Pavilion',
        elementValue: ['N', 'VS', 'S', 'M', 'L']
      },
      {
        elementKey: 'Milky',
        elementValue: ['M0', 'M1', 'M2', 'M3']
      },
      {
        elementKey: 'Luster',
        elementValue: ['EX', 'VG', 'G', 'P']
      },
      {
        elementKey: 'Eye Clean',
        elementValue: ['Y', 'N', 'B']
      }
    ]
  },
  {
    key: 'White Inclusion',
    value: [
      {
        elementKey: 'Table Inclusion',
        elementValue: ['T0', 'T1', 'T2', 'T3']
      },
      {
        elementKey: 'Side Inclusion',
        elementValue: ['S0', 'S1', 'S2', 'S3']
      },
      {
        elementKey: 'Natural Crown',
        elementValue: ['N', 'VS', 'S', 'M', 'L']
      },
      {
        elementKey: 'Natural Girdle',
        elementValue: ['N', 'VS', 'S', 'M', 'L']
      },
      {
        elementKey: 'Natural Pavilion',
        elementValue: ['N', 'VS', 'S', 'M', 'L']
      },
      {
        elementKey: 'Surface Graining',
        elementValue: ['G0', 'G1', 'G2', 'G3']
      },
      {
        elementKey: 'Internal Graining',
        elementValue: ['IG0', 'IG1', 'IG2', 'IG3']
      }
    ]
  }
];

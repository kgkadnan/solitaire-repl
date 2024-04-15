export const basiDetailsHead1 = [
  { key: 'lot_id', label: 'Stock No' }, //n
  { key: 'shape', label: 'Shape' },
  { key: 'carats', label: 'Carats' },
  { key: 'clarity', label: 'Clarity' },
  { key: 'color', label: 'Color' },
  { key: 'cut', label: 'Cut' },
  { key: 'polish', label: 'Polish', hiddenBelow1024: true }
];

export const basiDetailsHead2 = [
  { key: 'polish', label: 'Polish', hiddenAbove1024: true },
  { key: 'symmetry', label: 'Symmetry' },
  { key: 'fluorescence', label: 'Fluorescence' },
  { key: 'lab', label: 'Lab' },
  { key: 'location', label: 'Location' },
  { key: 'origin_country', label: 'Country of Origin', hiddenBelow1024: true }
];

export const basiDetailsHead3 = [
  { key: 'origin_country', label: 'Country of Origin', hiddenAbove1024: true },
  { key: 'shade', label: 'Shade' },
  // { key: "", label: "Tinge Intensity" }, //n
  { key: 'inscription', label: 'Laser Inscription', hiddenBelow1024: true } //n
];

export const basiDetailsHead4 = [
  { key: 'inscription', label: 'Laser Inscription', hiddenAbove1024: true } //n
];

export const mesurementsHead1 = [
  { key: 'table_percentage', label: 'Table%' }, //n
  { key: 'depth_percentage', label: 'Depth%' }, //n
  { key: 'ratio', label: 'Ratio' },
  { key: 'measurement', label: 'Measurements' }, //n
  { key: 'crown_angle', label: 'Crown Angle', hiddenBelow1024: true }
];

export const mesurementsHead2 = [
  { key: 'crown_angle', label: 'Crown Angle', hiddenAbove1024: true },
  { key: 'crown_height', label: 'Crown Height' },
  { key: 'girdle_percentage', label: 'Girdle%' }, //n
  { key: 'pavilion_angle', label: 'Pavilion Angle' },
  { key: 'pavilion_height', label: 'Pavilion Height', hiddenBelow1024: true },
  { key: 'lower_half', label: 'Lower Half', hiddenBelow1024: true }
];

export const mesurementsHead3 = [
  { key: 'pavilion_height', label: 'Pavilion Height', hiddenAbove1024: true },
  { key: 'lower_half', label: 'Lower Half', hiddenAbove1024: true },
  { key: 'star_length', label: 'Star Length' },
  { key: 'girdle', label: 'Girdle' },
  { key: 'culet', label: 'Culet' }
];

export const inclusionDetailsHead1 = [
  { key: 'table_black', label: 'Black Table' },
  { key: 'side_black', label: 'Side Black' },
  { key: 'crown_open', label: 'Open Crown' },
  { key: 'table_open', label: 'Open Table' },
  { key: 'pavilion_open', label: 'Open Pavilion' },
  { key: 'milky', label: 'Milky', hiddenBelow1024: true }
];

export const inclusionDetailsHead2 = [
  { key: 'milky', label: 'Milky', hiddenAbove1024: true },
  { key: 'luster', label: 'Luster' },
  { key: 'eye_clean', label: 'Eye Clean' },
  { key: 'table_inclusion', label: 'Table Inclusion' },
  { key: 'side_inclusion', label: 'Side Inclusion' },
  { key: 'natural_crown', label: 'Natural Crown', hiddenBelow1024: true }
];

export const inclusionDetailsHead3 = [
  { key: 'natural_crown', label: 'Natural Crown', hiddenAbove1024: true },
  { key: 'natural_girdle', label: 'Natural Girdle' },
  { key: 'natural_pavilion', label: 'Natural Pavilion' },
  { key: 'surface_graining', label: 'Surface Graining' },
  {
    key: 'internal_graining',
    label: 'Internal Graining',
    hiddenBelow1024: true
  }
];

export const inclusionDetailsHead4 = [
  {
    key: 'internal_graining',
    label: 'Internal Graining',
    hiddenAbove1024: true
  }
];

export const otherInformationHead1 = [
  { key: 'key_to_symbol', label: 'Key to Symbol' },
  { key: 'report_comments', label: 'Report Comments' },
  { key: 'tracr_id', label: 'Tracr ID', hiddenBelow1024: true },
  { key: 'total_grade', label: 'Total Grade', hiddenBelow1024: true }
];

export const otherInformationHead2 = [
  { key: 'tracr_id', label: 'Tracr ID', hiddenAbove1024: true },
  { key: 'total_grade', label: 'Total Grade', hiddenAbove1024: true },
  { key: 'disclosed_source', label: 'Disclosed Source', hiddenBelow1024: true }
];

export const otherInformationHead3 = [
  { key: 'disclosed_source', label: 'Disclosed Source', hiddenAbove1024: true }
];

export const basicDetails = [
  basiDetailsHead1,
  basiDetailsHead2,
  basiDetailsHead3,
  basiDetailsHead4
];
export const mesurementsDetails = [
  mesurementsHead1,
  mesurementsHead2,
  mesurementsHead3
];
export const inclusionDetails = [
  inclusionDetailsHead1,
  inclusionDetailsHead2,
  inclusionDetailsHead3,
  inclusionDetailsHead4
];
export const otherInformationDetails = [
  otherInformationHead1,
  otherInformationHead2,
  otherInformationHead3
];

export const commonImages = [
  { imageName: '/Download.png', alt: 'download' },
  { imageName: '/Media.png', alt: 'media' }
];

export const FILE_URLS = {
  IMG: 'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***/still.jpg',
  CERT_FILE:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/Cert/***.jpeg',
  VIDEO_FILE:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/Vision360.html?d=***&autoPlay=1',
  B2B_SPARKLE:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/Vision360.html?d=***-S',
  B2B: 'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/Vision360.html?d=***',
  HEART:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***/Heart_Black_BG.jpg',
  ARROW:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***/Arrow_Black_BG.jpg',
  ASET: 'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***/ASET_White_BG.jpg',
  IDEAL:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***/IDEAL_White_BG.jpg',
  FLUORESCENCE:
    'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/***-F/still.jpg'
};

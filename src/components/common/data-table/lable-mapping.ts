import { KeyLabelMapping } from './interface';

/* The above code is defining several constant variables that map keys to labels. These mappings are
  used to display labels for specific keys in a user interface. Each constant variable represents a
  different category of labels, such as basic details, measurements, inclusion details, and other
  information. The keys in the mappings correspond to specific data fields, while the values represent
  the labels to be displayed. */
export const keyLabelMapping: KeyLabelMapping = {
  lot_id: 'Stock No',
  shape: 'Shape',
  carat: 'Carat',
  color: 'Color',
  clarity: 'Clarity',
  discount: 'Discount',
  amount: 'Amt($)',
};
export const basicDetailsLabelMapping: KeyLabelMapping = {
  lot_id: 'Stock No.',
  rpt_number: 'Report No.',
  shape: 'Shape',
  carat: 'Carat',
  color: 'Color',
  color_shade: 'Color Shade',
  color_shade_intensity: 'Color Shade Intensity',
  clarity: 'Clarity',
  cut: 'Cut',
  polish: 'Polish',
  symmetry: 'Symmetry',
  fluorescence: 'Fluorescence',
  culet: 'Culet',
  lab: 'Lab',
  ha: 'Hearts & Arrows',
  brilliance: 'Brilliancy',
  country_origin: 'Country of Origin',
  location: 'Location',
  type_certificate: 'Type 2 Certificate',
  inscription: 'Laser Inscription',
};
export const measurementsLabelMapping: KeyLabelMapping = {
  table_percentage: 'Table%',
  depth_percentage: 'Depth%',
  ratio: 'Ratio',
  length: 'Length',
  width: 'Width',
  depth: 'Depth',
  crown_angle: 'Crown Angle',
  crown_height: 'Crown Height',
  girdle_percentage: 'Girdle%',
  pavilion_angle: 'Pavilion Angle',
  pavilion_depth: 'Pavilion Depth',
  lower_half: 'Lower Half',
  star_length: 'Star Length',
};
export const inclusionDetailsLabelMapping: KeyLabelMapping = {
  black_table: 'Table Black',
  side_black: 'Black Side',
  open_crown: 'Crown Open',
  open_table: 'Table Open',
  open_pavilion: 'Pavilion Open',
  milky: 'Milky',
  luster: 'Luster',
  eye_clean: 'Eye Clean',
  table_inclusion: 'Table Inclusion',
  side_inclusion: 'Side Inclusion',
  natural_crown: 'Natural Crown',
  natural_girdle: 'Natural Girdle',
  natural_pavilion: 'Natural Pavilion',
  surface_graining: 'Surface Graining',
  internal_graining: 'Internal Graining',
};
export const otherInformationsLabelMapping: KeyLabelMapping = {
  girdle: 'Girdle',
  key_to_symbbol: 'Key to Symbol',
  report_comments: 'Report Comments',
};

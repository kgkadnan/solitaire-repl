import { IKeyLabelMapping } from './interface';

/* The above code is defining several constant variables that map keys to labels. These mappings are
  used to display labels for specific keys in a user interface. Each constant variable represents a
  different category of labels, such as basic details, measurements, inclusion details, and other
  information. The keys in the mappings correspond to specific data fields, while the values represent
  the labels to be displayed. */
export const keyLabelMapping: IKeyLabelMapping = {
  lot_id: 'Stock No',
  shape: 'Shape',
  carat: 'Carat',
  color: 'Color',
  clarity: 'Clarity',
  discount: 'Discount',
  amount: 'Amt($)'
};
export const basicDetailsLabelMapping: IKeyLabelMapping = {
  lot_id: 'Stock No.',
  // rpt_number: 'Report No.',
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
  inscription: 'Laser Inscription'
};
export const measurementsLabelMapping: IKeyLabelMapping = {
  table_percentage: 'Table %',
  depth_percentage: 'Depth %',
  ratio: 'Ratio',
  length: 'Length',
  width: 'Width',
  depth: 'Depth',
  crown_angle: 'Crown Angle',
  crown_height: 'Crown Height',
  girdle_percentage: 'Girdle %',
  pavilion_angle: 'Pavilion Angle',
  pavilion_height: 'Pavilion Height',
  lower_half: 'Lower Half',
  star_length: 'Star Length'
};
export const inclusionDetailsLabelMapping: IKeyLabelMapping = {
  table_black: 'Table Black',
  side_black: 'Black Side',
  crown_open: 'Crown Open',
  table_open: 'Table Open',
  pavilion_open: 'Pavilion Open',
  milky: 'Milky',
  luster: 'Luster',
  eye_clean: 'Eye Clean',
  table_inclusion: 'Table Inclusion',
  side_inclusion: 'Side Inclusion',
  natural_crown: 'Natural Crown',
  natural_girdle: 'Natural Girdle',
  natural_pavilion: 'Natural Pavilion',
  surface_graining: 'Surface Graining',
  internal_graining: 'Internal Graining'
};
export const otherInformationsLabelMapping: IKeyLabelMapping = {
  girdle: 'Girdle',
  key_to_symbbol: 'Key to Symbol',
  report_comments: 'Report Comments'
};

import { IKeyLabelMapping } from '@/interface/interface';

export const basicDetailsLabelMapping: IKeyLabelMapping = {
  lot_id: 'Stock No.',
  shape: 'Shape',
  carat: 'Carat',
  color: 'Color',
  color_shade: 'Color Shade',
  clarity: 'Clarity',
  cut: 'Cut',
  polish: 'Polish',
  symmetry: 'Symmetry',
  fluorescence: 'Fluorescence',
  lab: 'Lab'
};

export const measurementsLabelMapping: IKeyLabelMapping = {
  table_percentage: 'Table %',
  depth_percentage: 'Depth %',
  ratio: 'Ratio',
  length: 'Length',
  width: 'Width',
  depth: 'Depth'
};

export const inclusionDetailsLabelMapping: IKeyLabelMapping = {
  table_black: 'Black Table',
  side_black: 'Side Black',
  crown_open: 'Open Crown',
  table_open: 'Open Table',
  milky: 'Milky',
  eye_clean: 'Eye Clean'
};

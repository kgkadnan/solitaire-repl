export interface IMeasurements {
  [key: string]: string[] | string;
  depth: string;
  ratio: string;
  width: string;
  depth_percentage: string;
  length: string;
  table_percentage: string;
  girdle_percentage: string;
  lower_half: string;
  crown_angle: string;
  star_length: string;
  crown_height: string;
  pavilion_angle: string;
  pavilion_height: string;
}

export interface IInclusionDetails {
  [key: string]: string[] | string;
  milky: string[];
  luster: string[];
  eye_clean: string[];
  crown_open: string[];
  table_open: string[];
  side_black: string[];
  table_black: string[];
  natural_crown: string[];
  pavilion_open: string[];
  natural_girdle: string[];
  side_inclusion: string[];
  table_inclusion: string[];
  natural_pavilion: string[];
  surface_graining: string[];
  internal_graining: string[];
}

export interface IOtherInformation {
  [key: string]: string[] | string;
  girdle: string[];
  key_to_symbol: string[];
}

export interface IBasicCardDetails {
  [key: string]: string[] | string;
  cut: string[];
  lab: string[];
  carat: string[];
  color: string[];
  culet: string[];
  shape: string[];
  polish: string[];
  clarity: string[];
  discount: string;
  location: string[];
  overtone: string[];
  symmetry: string[];
  intensity: string[];
  color_shade: string[];
  price_range: string;
  fluoroscence: string[];
  price_per_carat: string;
  country_of_origin: string[];
  color_shade_intensity: string[];
}
export interface IMetaData {
  measurements: IMeasurements;
  inclusion_details: IInclusionDetails;
  other_information: IOtherInformation;
  basic_card_details: IBasicCardDetails;
}

export interface ISavedSearchData {
  diamond_count: string;
  name: string;
  customer_id: string;
  meta_data: IMetaData[];
  id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

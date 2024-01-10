import React from 'react';

import { StaticImageData } from 'next/image';

export interface ICardData {
  id: string;
  cardActionIcon: StaticImageData;
  cardHeader: React.ReactNode;
  cardContent: React.ReactNode;
}

export interface IMeasurements {
  [key: string]: string[] | string;
  depth: string;
  ratio: string;
  width: string;
  'depth%': string;
  length: string;
  'table%': string;
  'girdle%': string;
  lower_half: string;
  crown_angle: string;
  star_length: string;
  crown_height: string;
  pavilion_angle: string;
  pavilion_depth: string;
}

export interface IInclusionDetails {
  [key: string]: string[] | string;
  milky: string[];
  luster: string[];
  eye_clean: string[];
  open_crown: string[];
  open_table: string[];
  side_table: string[];
  black_table: string[];
  natural_crown: string[];
  open_pavilion: string[];
  natural_girdle: string[];
  side_inclusion: string[];
  table_inclusion: string[];
  natural_pavilion: string[];
  surface_graining: string[];
  internal_graining: string[];
}

export interface KeyLabelMapping {
  [key: string]: string;
}

export interface IOtherInformation {
  [key: string]: string[] | string;
  girdle: string[];
  key_to_symbol: string[];
}

export interface IBasicCardDetails {
  [key: string]: string[] | string;
  'H&A': string[];
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
  brilliance: string[];
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

export interface IKeyLabelMapping {
  [key: string]: string;
}

export interface IFormatedData {
  [key: string]: string | string[];
}

export interface Item {
  name: string;
}

export interface IDateRange {
  from: Date;
  to: Date;
}

interface SavedSearch {
  diamond_count: string;
  name: string;
  customer_id: string;
  meta_data: {
    [key: string]: string | string[];
  };
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SavedSearchResponse {
  savedSearches: SavedSearch[];
  count: number | undefined;
  limit: number;
  offset: number;
}

interface ProductVariant {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  product_id: string;
  sku: string | null;
  barcode: string | null;
  ean: string | null;
  upc: string | null;
  variant_rank: number;
  inventory_quantity: number;
  allow_backorder: boolean;
  manage_inventory: boolean;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string | null;
  weight: string | null;
  length: string | null;
  height: string | null;
  width: string | null;
  metadata: any | null;
}

interface Product {
  id: string;
  variants: ProductVariant[];
}

export interface ProductResponse {
  products: Product[];
  count: number;
  offset: number;
  limit: number;
  search_id: string;
}

import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface TableColumn {
  label: string;
  accessor: string;
  sequence: number;
  is_fixed: boolean;
  is_disabled: boolean;
  id: string;
}

export interface Rows {
  id: string;
  stock_no: string | null;
  is_memo_out: boolean;
  diamond_status: string | null;
  discount: number;
  amount: number;
  color: string | null;
  shape: string | null;
  clarity: string | null;
  cut: string | null;
  polish: string | null;
  fluorescence: string | null;
  symmetry: string | null;
  lab: string | null;
  rpt_number: string | null;
  certificate_number: number | null;
  lot_id: number | null;
  certificate_url: string | StaticImport;
  girdle: string | null;
  location: string | null;
  color_shade: string | null;
  color_shade_intensity: string | null;
  intensity: string | null;
  overtone: string | null;
  ha: string | null;
  brilliance: string | null;
  black_table: string | null;
  side_black: string | null;
  open_crown: string | null;
  open_pavilion: string | null;
  milky: string | null;
  luster: string | null;
  eye_clean: string | null;
  open_table: string | null;
  table_inclusion: string | null;
  side_inclusion: string | null;
  natural_crown: string | null;
  natural_pavilion: string | null;
  natural_girdle: string | null;
  surface_graining: string | null;
  internal_graining: string | null;
  carat: number | null;
  star_length: number | null;
  price_range: number | null;
  price_per_carat: number | null;
  girdle_percentage: number | null;
  pavilion_angle: number | null;
  depth_percentage: number | null;
  table_percentage: number | null;
  crown_angle: number | null;
  crown_height: number | null;
  pavilion_depth: number | null;
  lower_half: number | null;
  ratio: number | null;
  length: number | null;
  depth: number | null;
  width: number | null;
  rap: number | null;
  rap_value: number | null;
  culet: string | null;
  inscription: string | null;
  tracr_id: string | null;
  total_grade: string | null;
  disclosed_source: string | null;
  country_origin: string | null;
  details: any;
}

export interface Product {
  id: string;
  title: string | null;
  subtitle: string | null;
  status: string | null;
  external_id: string | null;
  description: string | null;
  handle: string | null;
  is_giftcard: boolean | null;
  discountable: boolean | null;
  thumbnail: string | null;
  collection_id: string | null;
  type_id: string | null;
  weight: number | null;
  length: number | null;
  height: number | null;
  width: number | null;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  metadata: string | null;
  profile_id: string | null;
  color: string | null;
  shape: string | null;
  clarity: string | null;
  shape_detail: {
    name: string | null;
    fullname: string | null;
    id: string | null;
    created_at: string | null;
    updated_at: string | null;
  } | null;
  cut: string | null;
  polish: string | null;
  symmetry: string | null;
  fluorescence: string | null;
  lab: string | null;
  rpt_number: string | null;
  certificate_url: string | null;
  girdle: string | null;
  location: string | null;
  color_shade: string | null;
  color_shade_intensity: string | null;
  overtone: string | null;
  intensity: string | null;
  ha: string | null;
  brilliance: string | null;
  black_table: string | null;
  side_black: string | null;
  open_crown: string | null;
  open_table: string | null;
  open_pavilion: string | null;
  milky: string | null;
  luster: string | null;
  eye_clean: string | null;
  table_inclusion: string | null;
  side_inclusion: string | null;
  natural_crown: string | null;
  natural_girdle: string | null;
  natural_pavilion: string | null;
  surface_graining: string | null;
  internal_graining: string | null;
  carat: number | null;
  discount: number;
  price_range: string | null;
  price_per_carat: number | null;
  girdle_percentage: number | null;
  pavilion_angle: number | null;
  star_length: number | null;
  depth_percentage: number | null;
  table_percentage: number | null;
  crown_angle: number | null;
  pavilion_depth: number | null;
  crown_height: number | null;
  lower_half: number | null;
  ratio: number | null;
  depth: number | null;
  certificate_number: string | null;
  rap: number | null;
  rap_value: number | null;
  culet: string | null;
  inscription: string | null;
  tracr_id: string | null;
  total_grade: string | null;
  disclosed_source: string | null;
  is_memo_out: string | null;
  lot_id: string | null;
  diamond_status: string | null;
  collection: string | null;
  images:
    | {
        id: string | null;
        created_at: string | null;
        updated_at: string | null;
        deleted_at: string | null;
        url: string | null;
        metadata: string | null;
      }[]
    | null;
  options:
    | {
        id: string | null;
        created_at: string | null;
        updated_at: string | null;
        deleted_at: string | null;
        title: string | null;
        product_id: string | null;
        metadata: string | null;
        values:
          | {
              id: string | null;
              created_at: string | null;
              updated_at: string | null;
              deleted_at: string | null;
              value: string | null;
              option_id: string | null;
              variant_id: string | null;
              metadata: string | null;
            }[]
          | null;
      }[]
    | null;
  profiles:
    | {
        id: string | null;
        created_at: string | null;
        updated_at: string | null;
        deleted_at: string | null;
        name: string | null;
        type: string | null;
        metadata: string | null;
      }[]
    | null;
  tags: string[] | null;
  type: string | null;
  variants: {
    id: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    title: string | null;
    product_id: string | null;
    sku: string | null;
    barcode: string | null;
    ean: string | null;
    upc: string | null;
    variant_rank: number | null;
    inventory_quantity: number | null;
    allow_backorder: boolean | null;
    manage_inventory: boolean | null;
    hs_code: string | null;
    origin_country: string | null;
    mid_code: string | null;
    material: string | null;
    weight: number | null;
    length: number | null;
    height: number | null;
    width: number | null;
    metadata: string | null;
    options:
      | {
          id: string | null;
          created_at: string | null;
          updated_at: string | null;
          deleted_at: string | null;
          value: string | null;
          option_id: string | null;
          variant_id: string | null;
          metadata: string | null;
        }[]
      | null;
    prices: {
      id: string;
      created_at: string;
      updated_at: string;
      deleted_at: string;
      currency_code: string;
      amount: number;
      min_quantity: number;
      max_quantity: number;
      price_list_id: string;
      region_id: string;
      price_list: string;
      variant_id: string;
    }[];

    original_price: string | null;
    calculated_price: string | null;
    original_price_incl_tax: string | null;
    calculated_price_incl_tax: string | null;
    original_tax: string | null;
    calculated_tax: string | null;
    tax_rates: string | null;
  }[];
}

export interface IYourSelection {
  saveSearchName: string;
  isSavedSearch: boolean;
  queryParams: string[];
}

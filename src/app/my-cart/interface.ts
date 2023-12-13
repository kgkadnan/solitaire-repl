interface Price {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  currency_code: string;
  amount: number;
  min_quantity: number | null;
  max_quantity: number | null;
  price_list_id: string | null;
  region_id: string | null;
}

interface Variant {
  id: string;
  prices: Price[];
}

interface Product {
  shape: string;
  color: string;
  clarity: string;
  cut: string | null;
  polish: string;
  symmetry: string;
  fluorescence: string;
  lab: string;
  rpt_number: string;
  certificate_number: string;
  lot_id: string;
  certificate_url: string | null;
  girdle: string;
  location: string;
  color_shade: string;
  color_shade_intensity: string | null;
  overtone: string | null;
  intensity: string;
  ha: string | null;
  brilliance: string | null;
  black_table: string;
  side_black: string;
  open_crown: string;
  open_pavilion: string;
  open_table: string;
  milky: string;
  luster: string;
  eye_clean: string;
  table_inclusion: string;
  side_inclusion: string;
  natural_crown: string;
  natural_girdle: string;
  natural_pavilion: string;
  surface_graining: string;
  internal_graining: string;
  carat: number;
  discount: number;
  price_range: string | null;
  price_per_carat: number;
  girdle_percentage: number;
  pavilion_angle: number;
  star_length: number;
  depth_percentage: number | null;
  table_percentage: number;
  crown_angle: number;
  pavilion_depth: number;
  crown_height: number;
  lower_half: number;
  ratio: number;
  length: number;
  width: number;
  depth: number;
  rap: number;
  rap_value: number;
  culet: string;
  inscription: string;
  tracr_id: string;
  total_grade: string | null;
  disclosed_source: string | null;
  is_memo_out: string | null;
  diamond_status: string;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  handle: string;
  is_giftcard: boolean;
  status: string;
  thumbnail: string;
  weight: number;
  height: number | null;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string | null;
  collection_id: string | null;
  type_id: string | null;
  discountable: boolean;
  external_id: string | null;
  metadata: string | null;
  variants: Variant[];
}

export interface ProductItem {
  id: string;
  created_at: string;
  updated_at: string;
  cart_id: string;
  order_id: string | null;
  variant_id: string;
  product: Product;
}

interface Cart {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  items: ProductItem[];
}

export interface IcartData {
  cart: Cart;
}

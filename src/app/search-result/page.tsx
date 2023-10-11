'use client';
import { CustomFooter } from '@/components/common/footer';
import styles from './search-results.module.scss';
import { ManageLocales } from '@/utils/translate';
import React, { useCallback, useEffect, useState } from 'react';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import CloseOutline from '@public/assets/icons/close-outline.svg?url';
import InfoCircleOutline from '@public/assets/icons/information-circle-outline.svg?url';
import sortOutline from '@public/assets/icons/sort-outline.svg';
import Image, { StaticImageData } from 'next/image';
import { CustomDropdown } from '@/components/common/dropdown';
import roundImg from '@public/assets/images/Roundbig.png';
import { CustomInputlabel } from '@/components/common/input-label';
import Tooltip from '@/components/common/tooltip';
import { CustomSlider } from '@/components/common/slider';
import { CustomRadioButton } from '@/components/common/buttons/radio-button';
import { useGetAllProductQuery } from '@/slices/product';
import CustomDataTable, { Rows } from '@/components/common/data-table';
import { constructUrlParams } from '@/utils/construct-url-param';

interface TableColumn {
  label: string;
  accessor: string;
}

let optionLimits = [
  { id: 1, value: '1' },
  { id: 2, value: '10' },
];

interface Data {
  [key: string]: {
    id: string | null;
    stock_no: string | null;
    is_memo_out: boolean | null;
    status: string | null;
    discount: number | null;
    amount: number | null;
    details: {
      gia: string | null | StaticImageData;
      stone: string | null | StaticImageData;
    };
    color: string | null;
    country_origin: string | null;
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
    certificate_url: string | null;
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
    open_table: string | null;
  }[];
}

// const dummyData: Data = {
//   search1: [
//     {
//       id: 'prod_01HC9GRYHBTC535RK044RES7PM',
//       title: 'Medusa T-Shirt',
//       subtitle: null,
//       status: 'A',
//       external_id: null,
//       description:
//         'Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.',
//       handle: 't-shirt',
//       is_giftcard: false,
//       discountable: true,
//       thumbnail:
//         'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png',
//       collection_id: null,
//       type_id: null,
//       weight: 400,
//       length: null,
//       height: null,
//       width: null,
//       hs_code: null,
//       origin_country: null,
//       mid_code: null,
//       material: null,
//       created_at: '2023-10-09T06:07:41.807Z',
//       updated_at: '2023-10-09T06:07:41.807Z',
//       deleted_at: null,
//       metadata: null,
//       profile_id: 'sp_01HC9GRRVBGGSNSHRB802WZNYJ',
//       color: null,
//       shape: null,
//       clarity: null,
//       cut: null,
//       polish: null,
//       symmetry: null,
//       fluorescence: null,
//       lab: null,
//       rpt_number: null,
//       certificate_url: null,
//       girdle: null,
//       location: null,
//       color_shade: null,
//       color_shade_intensity: null,
//       overtone: null,
//       intensity: null,
//       ha: null,
//       brilliance: null,
//       black_table: null,
//       side_black: null,
//       open_crown: null,
//       open_table: null,
//       open_pavilion: null,
//       milky: null,
//       luster: null,
//       eye_clean: null,
//       table_inclusion: null,
//       side_inclusion: null,
//       natural_crown: 'sss',
//       natural_girdle: null,
//       natural_pavilion: null,
//       surface_graining: null,
//       internal_graining: null,
//       carat: null,
//       discount: null,
//       price_range: null,
//       price_per_carat: null,
//       girdle_percentage: null,
//       pavilion_angle: null,
//       star_length: null,
//       depth_percentage: null,
//       table_percentage: null,
//       crown_angle: null,
//       pavilion_depth: null,
//       crown_height: null,
//       lower_half: null,
//       ratio: null,
//       depth: null,
//       certificate_number: null,
//       rap: null,
//       rap_value: null,
//       culet: null,
//       inscription: null,
//       tracr_id: null,
//       total_grade: null,
//       disclosed_source: null,
//       is_memo_out: null,
//       lot_id: null,
//       collection: null,
//       images: [
//         {
//           id: 'img_01HC9GRY968Y7W36Y3FA5Y2FPM',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png',
//           metadata: null,
//         },
//         {
//           id: 'img_01HC9GRY96704P35JCFW2M4F80',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-back.png',
//           metadata: null,
//         },
//         {
//           id: 'img_01HC9GRY97ZXFG4T8HDCEMNAW2',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-front.png',
//           metadata: null,
//         },
//         {
//           id: 'img_01HC9GRY972SRKSX7XJ051NBKJ',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-back.png',
//           metadata: null,
//         },
//       ],
//       options: [
//         {
//           id: 'opt_01HC9GRYS7AQEY2NDE0QCANDE1',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           title: 'Size',
//           product_id: 'prod_01HC9GRYHBTC535RK044RES7PM',
//           metadata: null,
//           values: [
//             {
//               id: 'optval_01HC9GRZ7215R5C6GMBSXYD08Z',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'S',
//               option_id: 'opt_01HC9GRYS7AQEY2NDE0QCANDE1',
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//               metadata: null,
//             },
//           ],
//         },
//         {
//           id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           title: 'Color',
//           product_id: 'prod_01HC9GRYHBTC535RK044RES7PM',
//           metadata: null,
//           values: [
//             {
//               id: 'optval_01HC9GRZ72H7PGGVQX2QWADJZN',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'Black',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GRZW1CCXZ2N0T5XQ8VJEM',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'White',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GRZW0E9AJ30S49255671F',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS0G9W6J2YZYHYX0BKZJB',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'Black',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS0G9NH8M1SNERSVYE045',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS14RJB56JWRVK6WV38S8',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'White',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS14RMZDTHA5YAF07MXFC',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS1RN2JMP6FVP01V6SQQN',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'Black',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS1RNX5Y8PP0N1W0J5GJA',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS2D40B6TRWYZF0H78V2D',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'White',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS2D4VKTYA9GFVMKNXNTV',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS3106AC1MSGF5S3F2CXJ',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'Black',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS310X3FWNCR2W96F9J9Y',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS3NDK5QKF0NNPXCY1MCK',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'White',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS3NDQ7CE67X2WR1VT1TJ',
//               metadata: null,
//             },
//           ],
//         },
//       ],
//       profiles: [
//         {
//           id: 'sp_01HC9GRRVBGGSNSHRB802WZNYJ',
//           created_at: '2023-10-09T06:07:40.697Z',
//           updated_at: '2023-10-09T06:07:40.697Z',
//           deleted_at: null,
//           name: 'Default Shipping Profile',
//           type: 'default',
//           metadata: null,
//         },
//       ],
//       tags: [],
//       type: null,
//       variants: [
//         {
//           id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           title: 'S / Black',
//           product_id: 'prod_01HC9GRYHBTC535RK044RES7PM',
//           sku: null,
//           barcode: null,
//           ean: null,
//           upc: null,
//           variant_rank: 0,
//           inventory_quantity: 100,
//           allow_backorder: false,
//           manage_inventory: true,
//           hs_code: null,
//           origin_country: null,
//           mid_code: null,
//           material: null,
//           weight: null,
//           length: null,
//           height: null,
//           width: null,
//           metadata: null,
//           options: [
//             {
//               id: 'optval_01HC9GRZ7215R5C6GMBSXYD08Z',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'S',
//               option_id: 'opt_01HC9GRYS7AQEY2NDE0QCANDE1',
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GRZ72H7PGGVQX2QWADJZN',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'Black',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//               metadata: null,
//             },
//           ],
//           prices: [
//             {
//               id: 'ma_01HC9GRZFN7ZJSMWQW9RPV7Q9H',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               currency_code: 'eur',
//               amount: 1950,
//               min_quantity: null,
//               max_quantity: null,
//               price_list_id: null,
//               region_id: null,
//               price_list: null,
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//             },
//             {
//               id: 'ma_01HC9GRZFNNAPMPSHE7ZV4Z7JF',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               currency_code: 'usd',
//               amount: 2200,
//               min_quantity: null,
//               max_quantity: null,
//               price_list_id: null,
//               region_id: null,
//               price_list: null,
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//             },
//           ],
//           original_price: null,
//           calculated_price: null,
//           original_price_incl_tax: null,
//           calculated_price_incl_tax: null,
//           original_tax: null,
//           calculated_tax: null,
//           tax_rates: null,
//         },
//       ],
//     },
//   ],
//   search2: [
//     {
//       id: 'prod_01HC9GRYHBTC535RK044RES7PM',
//       title: 'Medusa T-Shirt',
//       subtitle: null,
//       status: 'A',
//       external_id: null,
//       description:
//         'Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.',
//       handle: 't-shirt',
//       is_giftcard: false,
//       discountable: true,
//       thumbnail:
//         'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png',
//       collection_id: null,
//       type_id: null,
//       weight: 400,
//       length: null,
//       height: null,
//       width: null,
//       hs_code: null,
//       origin_country: null,
//       mid_code: null,
//       material: null,
//       created_at: '2023-10-09T06:07:41.807Z',
//       updated_at: '2023-10-09T06:07:41.807Z',
//       deleted_at: null,
//       metadata: null,
//       profile_id: 'sp_01HC9GRRVBGGSNSHRB802WZNYJ',
//       color: null,
//       shape: null,
//       clarity: null,
//       cut: null,
//       polish: null,
//       symmetry: null,
//       fluorescence: null,
//       lab: null,
//       rpt_number: null,
//       certificate_url: null,
//       girdle: 'yes',
//       location: null,
//       color_shade: null,
//       color_shade_intensity: null,
//       overtone: null,
//       intensity: null,
//       ha: null,
//       brilliance: null,
//       black_table: null,
//       side_black: null,
//       open_crown: null,
//       open_table: null,
//       open_pavilion: null,
//       milky: null,
//       luster: null,
//       eye_clean: null,
//       table_inclusion: null,
//       side_inclusion: null,
//       natural_crown: 'sss',
//       natural_girdle: null,
//       natural_pavilion: null,
//       surface_graining: null,
//       internal_graining: null,
//       carat: null,
//       discount: null,
//       price_range: null,
//       price_per_carat: null,
//       girdle_percentage: null,
//       pavilion_angle: null,
//       star_length: null,
//       depth_percentage: null,
//       table_percentage: null,
//       crown_angle: null,
//       pavilion_depth: null,
//       crown_height: null,
//       lower_half: null,
//       ratio: null,
//       depth: null,
//       certificate_number: null,
//       rap: null,
//       rap_value: null,
//       culet: null,
//       inscription: null,
//       tracr_id: null,
//       total_grade: null,
//       disclosed_source: null,
//       is_memo_out: null,
//       lot_id: null,
//       collection: null,
//       images: [
//         {
//           id: 'img_01HC9GRY968Y7W36Y3FA5Y2FPM',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png',
//           metadata: null,
//         },
//         {
//           id: 'img_01HC9GRY96704P35JCFW2M4F80',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-back.png',
//           metadata: null,
//         },
//         {
//           id: 'img_01HC9GRY97ZXFG4T8HDCEMNAW2',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-front.png',
//           metadata: null,
//         },
//         {
//           id: 'img_01HC9GRY972SRKSX7XJ051NBKJ',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-back.png',
//           metadata: null,
//         },
//       ],
//       options: [
//         {
//           id: 'opt_01HC9GRYS7AQEY2NDE0QCANDE1',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           title: 'Size',
//           product_id: 'prod_01HC9GRYHBTC535RK044RES7PM',
//           metadata: null,
//           values: [
//             {
//               id: 'optval_01HC9GRZ7215R5C6GMBSXYD08Z',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'S',
//               option_id: 'opt_01HC9GRYS7AQEY2NDE0QCANDE1',
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//               metadata: null,
//             },
//           ],
//         },
//         {
//           id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           title: 'Color',
//           product_id: 'prod_01HC9GRYHBTC535RK044RES7PM',
//           metadata: null,
//           values: [
//             {
//               id: 'optval_01HC9GRZ72H7PGGVQX2QWADJZN',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'Black',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GRZW1CCXZ2N0T5XQ8VJEM',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'White',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GRZW0E9AJ30S49255671F',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS0G9W6J2YZYHYX0BKZJB',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'Black',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS0G9NH8M1SNERSVYE045',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS14RJB56JWRVK6WV38S8',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'White',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS14RMZDTHA5YAF07MXFC',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS1RN2JMP6FVP01V6SQQN',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'Black',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS1RNX5Y8PP0N1W0J5GJA',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS2D40B6TRWYZF0H78V2D',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'White',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS2D4VKTYA9GFVMKNXNTV',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS3106AC1MSGF5S3F2CXJ',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'Black',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS310X3FWNCR2W96F9J9Y',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GS3NDK5QKF0NNPXCY1MCK',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'White',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GS3NDQ7CE67X2WR1VT1TJ',
//               metadata: null,
//             },
//           ],
//         },
//       ],
//       profiles: [
//         {
//           id: 'sp_01HC9GRRVBGGSNSHRB802WZNYJ',
//           created_at: '2023-10-09T06:07:40.697Z',
//           updated_at: '2023-10-09T06:07:40.697Z',
//           deleted_at: null,
//           name: 'Default Shipping Profile',
//           type: 'default',
//           metadata: null,
//         },
//       ],
//       tags: [],
//       type: null,
//       variants: [
//         {
//           id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//           created_at: '2023-10-09T06:07:41.807Z',
//           updated_at: '2023-10-09T06:07:41.807Z',
//           deleted_at: null,
//           title: 'S / Black',
//           product_id: 'prod_01HC9GRYHBTC535RK044RES7PM',
//           sku: null,
//           barcode: null,
//           ean: null,
//           upc: null,
//           variant_rank: 0,
//           inventory_quantity: 100,
//           allow_backorder: false,
//           manage_inventory: true,
//           hs_code: null,
//           origin_country: null,
//           mid_code: null,
//           material: null,
//           weight: null,
//           length: null,
//           height: null,
//           width: null,
//           metadata: null,
//           options: [
//             {
//               id: 'optval_01HC9GRZ7215R5C6GMBSXYD08Z',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'S',
//               option_id: 'opt_01HC9GRYS7AQEY2NDE0QCANDE1',
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//               metadata: null,
//             },
//             {
//               id: 'optval_01HC9GRZ72H7PGGVQX2QWADJZN',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               value: 'Black',
//               option_id: 'opt_01HC9GRYS8QF1PA9BVTDPA5ZV5',
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//               metadata: null,
//             },
//           ],
//           prices: [
//             {
//               id: 'ma_01HC9GRZFN7ZJSMWQW9RPV7Q9H',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               currency_code: 'eur',
//               amount: 1950,
//               min_quantity: null,
//               max_quantity: null,
//               price_list_id: null,
//               region_id: null,
//               price_list: null,
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//             },
//             {
//               id: 'ma_01HC9GRZFNNAPMPSHE7ZV4Z7JF',
//               created_at: '2023-10-09T06:07:41.807Z',
//               updated_at: '2023-10-09T06:07:41.807Z',
//               deleted_at: null,
//               currency_code: 'usd',
//               amount: 2200,
//               min_quantity: null,
//               max_quantity: null,
//               price_list_id: null,
//               region_id: null,
//               price_list: null,
//               variant_id: 'variant_01HC9GRZ729XVKJD8V24107FVX',
//             },
//           ],
//           original_price: null,
//           calculated_price: null,
//           original_price_incl_tax: null,
//           calculated_price_incl_tax: null,
//           original_tax: null,
//           calculated_tax: null,
//           tax_rates: null,
//         },
//       ],
//     },
//   ],
// };

const SearchResults = () => {
  const [dummyData, setDummyData] = useState<any>({});

  const [rows, setRows] = useState<Rows[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [yourSelectionData, setYourSelectionData] = useState<string[]>([]);

  //pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(1); // You can set the initial value here
  const [numberOfPages, setNumberOfPages] = useState(0);

  //Radio Button
  const [selectedValue, setSelectedValue] = useState('');

  const [totalAmount, setTotalAmount] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);

  const [searchUrl, setSearchUrl] = useState('');

  const { data, error, isLoading, refetch } = useGetAllProductQuery({
    offset: currentPage,
    limit: resultsPerPage,
    url: searchUrl,
  });

  //specific checkbox
  const handleClick = (id: string) => {
    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
    } else {
      updatedIsCheck.push(id);
    }

    setIsCheck(updatedIsCheck);

    if (updatedIsCheck.length === rows?.length) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
    if (isCheckAll) {
      setIsCheckAll(false);
    }
  };

  //Selecting All Checkbox Function
  const handleSelectAllCheckbox = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(rows?.map((li: any) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  //
  let checkboxData = {
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    handleClick: handleClick,
    isCheck: isCheck,
    isCheckAll: isCheckAll,
  };

  const tableColumns: TableColumn[] = [
    { label: 'Status', accessor: 'status' },
    { label: 'Select', accessor: 'select' },
    { label: 'Stock No', accessor: 'stock_no' },
    { label: 'Details', accessor: 'details' },
    { label: 'RPT No.', accessor: 'rpt_number' },
    { label: 'Loc.', accessor: 'location' },
    { label: 'SHP', accessor: 'shape' },
    { label: 'CTS', accessor: 'carat' },
    { label: 'COL', accessor: 'color' },
    { label: 'Clarity', accessor: 'clarity' },
    { label: 'CS', accessor: 'color_shade' },
    { label: 'CSI', accessor: 'color_shade_intensity' },
    { label: 'Milky', accessor: 'milky' },
    { label: 'RAP($)', accessor: 'rap' },
    { label: 'RAP Val.', accessor: 'rap_value' },
    { label: 'Discount%', accessor: 'discount' },
    { label: 'PR/CT', accessor: 'price_per_carat' },
    { label: 'Cut', accessor: 'cut' },
    { label: 'Pol.', accessor: 'polish' },
    { label: 'Symm.', accessor: 'symmetry' },
    { label: 'FLS', accessor: 'fluorescence' },
    { label: 'LAB', accessor: 'lab' },
    { label: 'BRL', accessor: 'brilliance' },
    { label: 'TB', accessor: 'black_table' },
    { label: 'SI', accessor: 'side_inclusion' },
    { label: 'SB', accessor: 'side_black' },
    { label: 'TI', accessor: 'table_inclusion' },
    { label: 'TO', accessor: 'open_table' },
    { label: 'CO', accessor: 'open_crown' },
    { label: 'PO', accessor: 'open_pavilion' },
    { label: 'EC', accessor: 'eye_clean' },
    { label: 'CN', accessor: 'natural_crown' },
    { label: 'GN', accessor: 'natural_girdle' },
    { label: 'PN', accessor: 'natural_pavilion' },
    { label: 'SG', accessor: 'surface_graining' },
    { label: 'IG', accessor: 'internal_graining' },
    { label: 'TBL%', accessor: 'table_percentage' },
    { label: 'DEP%', accessor: 'depth_percentage' },
    { label: 'Length', accessor: 'length' },
    { label: 'Width', accessor: 'width' },
    { label: 'Depth', accessor: 'depth' },
    { label: 'Ratio', accessor: 'ratio' },
    { label: 'C/A', accessor: 'crown_angle' },
    { label: 'C/H', accessor: 'crown_height' },
    { label: 'H&A', accessor: 'ha' },
    { label: 'Girdle', accessor: 'girdle' },
    { label: 'P/A', accessor: 'pavilion_angle' },
    { label: 'P/D', accessor: 'pavilion_depth' },
    { label: 'Culet', accessor: 'culet' },
    { label: 'Ins.', accessor: 'inscription' },
    { label: 'Origin', accessor: 'country_origin' },
    { label: 'L/H.', accessor: 'lower_half' },
    { label: 'S/L', accessor: 'star_length' },
    { label: 'Girdle%', accessor: 'girdle_percentage' },
    { label: 'Luster', accessor: 'luster' },
  ];

  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.searchResult.footer.more')}
              displayButtonAllStyle={{
                displayButtonStyle: styles.transparent,
              }}
            />
          }
          dropdownMenuLabel={['Share', 'Download Excel', 'Find Matching Pair']}
        />
      ),
    },
    {
      id: 2,
      displayButtonLabel: ManageLocales('app.searchResult.footer.confirmStone'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addSearch'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 4,
      displayButtonLabel: ManageLocales('app.searchResult.footer.modifySearch'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 5,
      displayButtonLabel: ManageLocales(
        'app.searchResult.footer.addToWhislist'
      ),
      style: styles.filled,
      fn: () => {},
    },
    {
      id: 6,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.filled,
      fn: () => {},
    },
  ];

  const handleButtonClick = (index: number) => {
    let result = constructUrlParams(yourSelectionData[index]);
    setSearchUrl(result);
    setActiveTab(index);
    if (dummyData[`search${index + 1}`] === undefined) {
      const searchTabKey = `search${index + 1}`;
      console.log('dddddddddddddddd', searchTabKey);

      //call api with specific parameters and set it on dummyData
      setDummyData((prevDummyData: any) => ({
        ...prevDummyData,
        [searchTabKey]: [
          {
            id: `prod_01HC9GSECGZ1TBF80VM55GG5oo${index}`,
            title: 'Medusa Hoodie',
            subtitle: null,
            status: 'published',
            external_id: null,
            description:
              'Reimagine the feeling of a classic hoodie. With our cotton hoodie, everyday essentials no longer have to be ordinary.',
            handle: 'hoodie',
            is_giftcard: false,
            discountable: true,
            thumbnail:
              'https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_front.png',
            collection_id: null,
            type_id: null,
            weight: 400,
            length: null,
            height: null,
            width: null,
            hs_code: null,
            origin_country: null,
            mid_code: null,
            material: null,
            created_at: '2023-10-09T06:07:41.807Z',
            updated_at: '2023-10-09T06:07:41.807Z',
            deleted_at: null,
            metadata: null,
            color: 'dontknow',
            shape: null,
            clarity: null,
            cut: null,
            polish: null,
            symmetry: null,
            fluorescence: null,
            lab: null,
            rpt_number: null,
            certificate_url: null,
            girdle: null,
            location: null,
            color_shade: null,
            color_shade_intensity: null,
            overtone: null,
            intensity: null,
            ha: null,
            brilliance: null,
            black_table: null,
            side_black: null,
            open_crown: null,
            open_table: null,
            open_pavilion: null,
            milky: null,
            luster: null,
            eye_clean: null,
            table_inclusion: null,
            side_inclusion: null,
            natural_crown: null,
            natural_girdle: null,
            natural_pavilion: null,
            surface_graining: null,
            internal_graining: null,
            carat: null,
            discount: null,
            price_range: null,
            price_per_carat: null,
            girdle_percentage: null,
            pavilion_angle: null,
            star_length: null,
            depth_percentage: null,
            table_percentage: null,
            crown_angle: null,
            pavilion_depth: null,
            crown_height: null,
            lower_half: null,
            ratio: null,
            depth: null,
            certificate_number: null,
            rap: null,
            rap_value: null,
            culet: null,
            inscription: null,
            tracr_id: null,
            total_grade: null,
            disclosed_source: null,
            is_memo_out: null,
            lot_id: null,
          },
        ], // Use computed property name
      }));

      let selectedSearchData = [
        {
          id: `prod_01HC9GSECGZ1TBF80VM55GG5oo${index}`,
          title: 'Medusa Hoodie',
          subtitle: null,
          status: 'published',
          external_id: null,
          description:
            'Reimagine the feeling of a classic hoodie. With our cotton hoodie, everyday essentials no longer have to be ordinary.',
          handle: 'hoodie',
          is_giftcard: false,
          discountable: true,
          thumbnail:
            'https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_front.png',
          collection_id: null,
          type_id: null,
          weight: 400,
          length: null,
          height: null,
          width: null,
          hs_code: null,
          origin_country: null,
          mid_code: null,
          material: null,
          created_at: '2023-10-09T06:07:41.807Z',
          updated_at: '2023-10-09T06:07:41.807Z',
          deleted_at: null,
          metadata: null,
          color: 'dontknow',
          shape: null,
          clarity: null,
          cut: null,
          polish: null,
          symmetry: null,
          fluorescence: null,
          lab: null,
          rpt_number: null,
          certificate_url: null,
          girdle: null,
          location: null,
          color_shade: null,
          color_shade_intensity: null,
          overtone: null,
          intensity: null,
          ha: null,
          brilliance: null,
          black_table: null,
          side_black: null,
          open_crown: null,
          open_table: null,
          open_pavilion: null,
          milky: null,
          luster: null,
          eye_clean: null,
          table_inclusion: null,
          side_inclusion: null,
          natural_crown: null,
          natural_girdle: null,
          natural_pavilion: null,
          surface_graining: null,
          internal_graining: null,
          carat: null,
          discount: null,
          price_range: null,
          price_per_carat: null,
          girdle_percentage: null,
          pavilion_angle: null,
          star_length: null,
          depth_percentage: null,
          table_percentage: null,
          crown_angle: null,
          pavilion_depth: null,
          crown_height: null,
          lower_half: null,
          ratio: null,
          depth: null,
          certificate_number: null,
          rap: null,
          rap_value: null,
          culet: null,
          inscription: null,
          tracr_id: null,
          total_grade: null,
          disclosed_source: null,
          is_memo_out: null,
          lot_id: null,
        },
      ];
      setRows(selectedSearchData);
    } else {
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
      console.log(dummyData, 'jyoti');
      let selectedSearchData = dummyData[`search${index + 1}`];
      // setRows(selectedSearchData);
    }
  };

  console.log('rows========', rows, dummyData);

  // Function to calculate total amount
  const calculateTotalAmount = useCallback(() => {
    let total = 0;
    isCheck.forEach((id) => {
      const selectedRow = rows.find((row) => row.id === id);
      if (selectedRow) {
        total += selectedRow.amount;
      }
    });
    return total;
  }, [isCheck, rows]);

  // Function to calculate average discount
  const calculateAverageDiscount = useCallback(() => {
    let totalDiscount = 0;
    isCheck.forEach((id) => {
      const selectedRow = rows.find((row) => row.id === id);
      if (selectedRow) {
        totalDiscount += selectedRow.discount;
      }
    });

    // Calculate average discount
    const avgDiscount = isCheck.length > 0 ? totalDiscount / isCheck.length : 0;
    return avgDiscount;
  }, [isCheck, rows]);

  useEffect(() => {
    // Update total amount and average discount whenever isCheck changes
    setTotalAmount(calculateTotalAmount());
    setAverageDiscount(calculateAverageDiscount());
  }, [calculateTotalAmount, calculateAverageDiscount]);

  useEffect(() => {
    let yourSelection = localStorage.getItem('Search');
    if (yourSelection) {
      setYourSelectionData(JSON.parse(yourSelection));
    }

    // data && setDummyData({ search1: Object.values(data)[0] });
    data && setRows(Object.values(data)[0]);
    console.log('hello====');
    setNumberOfPages(2);
  }, [data]);

  const closeSearch = (removeDataIndex: number) => {
    // Filter the dummyData to remove the specified search
    // const updatedData: Data = {};
    // Object.keys(dummyData).forEach((key, index) => {
    //   if (index !== removeDataIndex) {
    //     updatedData[key] = dummyData[key];
    //   }
    // });
    // // Update the state with the filtered dummyData
    // setRows([...Object.values(updatedData)[0]]); // Assuming you want to show the first search results after closing a search
  };

  const handleRadioChange = (radioValue: string) => {
    setSelectedValue(radioValue);
  };

  const radioButtonStyles = {
    radioButtonStyle: styles.radioStyle,
    radioLabelStyle: styles.labelStyle,
    mainRadioButton: styles.mainRadioButtonStyle,
  };
  const radioButtonDefaultStyles = {
    radioButtonStyle: styles.radioStyle,
    radioLabelStyle: styles.labelStyle,
  };

  const radioDataList = [
    [
      {
        id: '1',
        value: '1',
        radioButtonLabel: 'Carat - Low to High',
      },
      {
        id: '2',
        value: '2',
        radioButtonLabel: 'Carat - High to Low',
      },
    ],
    [
      {
        id: '3',
        value: '3',
        radioButtonLabel: 'Clarity - (FL - I3)',
      },
      {
        id: '4',
        value: '4',
        radioButtonLabel: 'Clarity - (I3 - FL)',
      },
    ],
    [
      {
        id: '5',
        value: '5',
        radioButtonLabel: 'Price - Low to High',
      },
      {
        id: '6',
        value: '6',
        radioButtonLabel: 'Price - High to Low',
      },
    ],
    [
      {
        id: '7',
        value: '7',
        radioButtonLabel: 'Discount - Low to High',
      },
      {
        id: '8',
        value: '8',
        radioButtonLabel: 'Discount - High to Low',
      },
    ],
    [
      {
        id: '9',
        value: '9',
        radioButtonLabel: 'Table Inclusion - (T0 - T3)',
      },
      {
        id: '10',
        value: '10',
        radioButtonLabel: 'Table Inclusion - (T3 - T0)',
      },
    ],
    [
      {
        id: '11',
        value: '11',
        radioButtonLabel: 'Fluorescence - (NON - VSTG) ',
      },
      {
        id: '12',
        value: '12',
        radioButtonLabel: 'Fluorescence - (VSTG - NON) ',
      },
    ],
    [
      {
        id: '13',
        value: '13',
        radioButtonLabel: 'Black Table - (B0 - B3) ',
      },
      {
        id: '14',
        value: '14',
        radioButtonLabel: 'Black Table - (B3 - B0) ',
      },
    ],
    [
      {
        id: '15',
        value: '15',
        radioButtonLabel: 'Side Black - (SB0 - SB3) ',
      },
      {
        id: '16',
        value: '16',
        radioButtonLabel: 'Side Black - (SB3 - SB0) ',
      },
    ],
    [
      {
        id: '17',
        value: '17',
        radioButtonLabel: 'Table Inclusion - (T0 - T3) ',
      },
      {
        id: '18',
        value: '18',
        radioButtonLabel: 'Table Inclusion - (T3 - T0) ',
      },
    ],
  ];

  const handleResultsPerPageChange = (event: string) => {
    const newResultsPerPage = parseInt(event, 10);
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(0); // Reset current page when changing results per page
  };

  const handlePageClick = (page: number) => {
    if (page >= 0 && page <= numberOfPages) {
      setIsCheck([]);
      setIsCheckAll(false);
      setCurrentPage(page);
    }
  };

  const paginationData = {
    handlePageClick: handlePageClick,
    handleResultsPerPageChange: handleResultsPerPageChange,
    currentPage: currentPage,
    numberOfPages: numberOfPages,
    resultsPerPage: resultsPerPage,
    optionLimits: optionLimits,
  };

  return (
    <>
      <div>
        <div className="border-b  border-solid  border-solitaireSenary mb-5">
          {/* top Header */}
          <div className={styles.topHeader}>
            <p className="">
              {ManageLocales('app.searchResult.header.searchResults')}
            </p>
          </div>

          {/* Search Tab Header */}
          <div className="flex items-center gap-5 text-solitaireTertiary  p-2 bg-solitaireSenary rounded-lg bg-opacity-100">
            {Object.keys(yourSelectionData).length > 0 &&
              Object.values(yourSelectionData).map(
                (yourSelection: any, index: number) => {
                  return (
                    <div key={`Search-${index}`}>
                      <div
                        style={{
                          marginRight:
                            index === yourSelection.length - 1 ? '0px' : '5px',
                        }}
                        className={`flex items-center cursor-pointer gap-[8px] ${
                          activeTab === index
                            ? styles.activeHeaderButtonStyle
                            : styles.headerButtonStyle
                        }`}
                      >
                        <div className="flex items-center">
                          <Tooltip
                            tooltipElement={
                              <InfoCircleOutline stroke="#8C7459" />
                            }
                            content={
                              <div
                                className={styles.yourSelectionContentContainer}
                              >
                                <CustomInputlabel
                                  htmlfor="text"
                                  label={`${ManageLocales(
                                    'app.advanceSearch.yourSelection'
                                  )}:`}
                                  overriddenStyles={{
                                    label: styles.yourSelectionTooltipHeader,
                                  }}
                                />
                                <div
                                  className={styles.yourSelectionMainContainer}
                                >
                                  <div key={`item-${index}`}>
                                    {Object.keys(yourSelection).map(
                                      (key: any) => (
                                        <div
                                          key={`key-${key}`}
                                          className={`${styles.yourSelectionSubContainer}`}
                                        >
                                          <div
                                            className={styles.labelContainer}
                                          >
                                            <CustomInputlabel
                                              htmlfor="text"
                                              label={key}
                                            />
                                            :
                                          </div>
                                          <div className="text-sm font-light">
                                            {Array.isArray(yourSelection[key])
                                              ? yourSelection[key].join(', ')
                                              : yourSelection[key]}
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            }
                            tooltipStyles={{
                              tooltipContainerStyles:
                                styles.tooltipContainerStyles,
                              tooltipContentStyle:
                                styles.yourSelectionTooltipContentStyle,
                            }}
                          />
                        </div>
                        <div>
                          <CustomDisplayButton
                            displayButtonAllStyle={{
                              displayLabelStyle: styles.headerButtonLabelStyle,
                            }}
                            displayButtonLabel={`Search ${index + 1}`}
                            handleClick={() => handleButtonClick(index)}
                          />
                        </div>
                        <div onClick={() => closeSearch(index)}>
                          <CloseOutline stroke="#8C7459" />
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>

          {/* Count Bar  */}
          <div className="flex justify-between py-3">
            <div className="flex gap-3">
              <p>Pieces : {`${isCheck.length}/${rows?.length}`}</p>
              <p>Total Avg. Dis : {averageDiscount.toFixed(2)}</p>
              <p>Total Amount : ${totalAmount.toFixed(2)}</p>
            </div>
            <CustomSlider
              sheetTriggerStyle={styles.mainCardContainer}
              sheetTriggenContent={
                <>
                  {' '}
                  <div className="flex gap-1">
                    <Image src={sortOutline} alt="sortOutline" width={20} />
                    <p className="text-solitaireTertiary">Sort by</p>
                  </div>
                </>
              }
              sheetContentStyle={styles.sheetContentStyle}
              sheetContent={
                <>
                  <div className={styles.sheetMainHeading}>
                    <p>
                      {ManageLocales('app.searchResult.slider.sortBy.filter')}
                    </p>
                  </div>

                  <div className={styles.radioButtonMainDiv}>
                    <CustomRadioButton
                      radioData={[
                        {
                          id: '0',
                          value: '0',
                          radioButtonLabel: 'Default',
                        },
                      ]}
                      onChange={handleRadioChange}
                      radioButtonAllStyles={radioButtonDefaultStyles}
                    />

                    {radioDataList.map((radioData, index) => (
                      <CustomRadioButton
                        key={index} // Ensure each component has a unique key
                        radioData={radioData}
                        onChange={handleRadioChange}
                        radioButtonAllStyles={radioButtonStyles}
                      />
                    ))}
                  </div>

                  {/* Show Results button */}
                  <div className={styles.showResultMainDiv}>
                    <CustomDisplayButton
                      displayButtonLabel={ManageLocales(
                        'app.searchResult.slider.sortBy.cancel'
                      )}
                      displayButtonAllStyle={{
                        displayButtonStyle: styles.transparent,
                      }}
                      // handleClick={showButtonHandleClick}
                    />
                    <CustomDisplayButton
                      displayButtonLabel={ManageLocales(
                        'app.searchResult.slider.sortBy.apply'
                      )}
                      displayButtonAllStyle={{
                        displayButtonStyle: styles.filled,
                      }}
                      // handleClick={showButtonHandleClick}
                    />
                  </div>
                </>
              }
            />
          </div>
        </div>
        {/* <CustomHeader dummyData={headerData} /> */}
        <CustomDataTable
          tableRows={rows}
          tableColumns={tableColumns}
          checkboxData={checkboxData}
          paginationData={paginationData}
        />
        <div className="sticky bottom-0 bg-solitairePrimary mt-3">
          <CustomFooter footerButtonData={footerButtonData} />
        </div>
      </div>
    </>
  );
};

export default SearchResults;

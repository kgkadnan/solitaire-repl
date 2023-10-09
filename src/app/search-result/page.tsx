'use client';
import CustomDataTable, { Rows } from '@/components/common/data-table';
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

interface TableColumn {
  label: string;
  accessor: string;
}

interface Data {
  [key: string]: {
    id: string | null;
    stock_no: string | null;
    is_memo_out: boolean;
    status: string | null;
    discount: number;
    amount: number;
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

const data: Data = {
  Search1: [
    {
      id: '1',
      stock_no: '789456465',
      status: 'A',
      amount: 966.5,
      discount: -19.5,
      shape: 'BR',
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      girdle: 'Med-Stk',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      open_pavilion: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,
      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,
      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: roundImg,
      },
    },
    {
      id: '2',
      stock_no: '789456466',
      status: 'H',
      amount: 1222.0,
      discount: -35.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,
      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,
      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,
      girdle: 'Med-Stk',
      is_memo_out: true,
      shape: 'BR',
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '3',
      stock_no: '789456467',
      status: 'A',
      amount: 765.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -12.5,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '4',
      stock_no: '789456468',
      status: 'A',
      amount: 985.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -25.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '5',
      stock_no: '789456469',
      status: 'H',
      amount: 1450.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -40.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '6',
      stock_no: '789456470',
      status: 'A',
      amount: 1100.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -30.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '7',
      stock_no: '789456471',
      status: 'A',
      amount: 820.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -18.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '8',
      stock_no: '789456472',
      status: 'H',
      amount: 900.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -15.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '9',
      stock_no: '789456473',
      status: 'A',
      amount: 1020.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -27.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '10',
      stock_no: '789456474',
      status: 'A',
      amount: 740.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -14.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '11',
      stock_no: '789456474',
      status: 'A',
      amount: 740.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -14.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '12',
      stock_no: '789456474',
      status: 'A',
      amount: 740.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -14.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '13',
      stock_no: '789456474',
      status: 'A',
      amount: 740.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -14.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '14',
      stock_no: '789456474',
      status: 'A',
      amount: 740.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -14.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '15',
      stock_no: '789456474',
      status: 'A',
      amount: 740.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -14.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '16',
      stock_no: '789456474',
      status: 'A',
      amount: 740.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -14.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '17',
      stock_no: '789456474',
      status: 'A',
      amount: 740.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -14.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '18',
      stock_no: '789456474',
      status: 'A',
      amount: 740.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,
      girdle: 'Med-Stk',
      discount: -14.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '19',
      stock_no: '789456474',
      status: 'A',
      amount: 740.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,

      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,

      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,

      girdle: 'Med-Stk',
      discount: -14.0,
      shape: 'BR',

      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
  ],

  Search2: [
    {
      id: '1',
      stock_no: '789456465',
      status: 'A',
      amount: 966.5,
      discount: -19.5,
      shape: 'BR',
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      girdle: 'Med-Stk',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      open_pavilion: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,
      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,
      is_memo_out: false,
      details: {
        gia: '/dummy',
        stone: roundImg,
      },
    },
    {
      id: '2',
      stock_no: '789456466',
      status: 'H',
      amount: 1222.0,
      discount: -35.0,
      color: 'D',
      clarity: 'FL',
      cut: 'EX',
      polish: 'EX',
      symmetry: 'EX',
      fluorescence: 'Non',
      lab: 'GIA',
      rpt_number: '352146529',
      country_origin: '',
      certificate_number: 326594658,
      lot_id: 12356989,
      certificate_url: '/certurl',
      location: 'IND',
      color_shade: 'WH',
      color_shade_intensity: 'None',
      overtone: null,
      intensity: '',
      ha: '.',
      brilliance: null,
      black_table: 'B0',
      side_black: 'SB0',
      open_crown: 'N',
      milky: 'MO',
      luster: 'EX',
      eye_clean: 'Y',
      table_inclusion: 'T0',
      side_inclusion: 'S0',
      natural_crown: 'N',
      natural_girdle: 'N',
      natural_pavilion: 'N',
      surface_graining: 'G0',
      internal_graining: 'IGO',
      carat: 0.33,
      price_range: null,
      price_per_carat: 3220.0,
      girdle_percentage: 0.0,
      pavilion_angle: null,
      star_length: null,
      depth_percentage: 56.6,
      table_percentage: 64.0,
      crown_angle: null,
      pavilion_depth: null,
      crown_height: null,
      lower_half: null,
      ratio: 1.64,
      length: 6.41,
      width: 3.92,
      depth: 2.22,
      rap: 4000,
      open_pavilion: 'N',
      rap_value: 12,
      culet: 'NONE',
      inscription: 'YES',
      tracr_id: 'EX',
      total_grade: 'null',
      disclosed_source: 'null',
      open_table: null,
      girdle: 'Med-Stk',
      is_memo_out: true,
      shape: 'BR',
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
  ],
};

const SearchResults = () => {
  const [rows, setRows] = useState<Rows[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [yourSelectionData, setYourSelectionData] = useState<string[]>([]);

  //Radio Button
  const [selectedValue, setSelectedValue] = useState('');

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
    setIsCheck: setIsCheck,
    setIsCheckAll: setIsCheckAll,
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
    setActiveTab(index);
    const selectedSearchData = Object.values(data)[index];
    setRows(selectedSearchData);
  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);

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
    setRows(Object.values(data)[0]);
  }, []);

  const closeSearch = (removeDataIndex: number) => {
    // Filter the data to remove the specified search
    const updatedData: Data = {};
    Object.keys(data).forEach((key, index) => {
      if (index !== removeDataIndex) {
        updatedData[key] = data[key];
      }
    });

    // Update the state with the filtered data
    setRows([...Object.values(updatedData)[0]]); // Assuming you want to show the first search results after closing a search
  };

  const handleRadioChange = (radioValue: string) => {
    setSelectedValue(radioValue);
  };

  console.log('setSelectedValue', selectedValue);

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
            {Object.keys(data).length > 0 &&
              Object.values(data).map((data: any, index: number) => {
                return (
                  <div key={`Search-${index}`}>
                    <div
                      style={{
                        marginRight: index === data.length - 1 ? '0px' : '5px',
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
                                {yourSelectionData?.map(
                                  (data, yourSelectionIndex) => {
                                    console.log(
                                      'yourSelectionIndex',
                                      Object.values(data)
                                    );

                                    return (
                                      <>
                                        {yourSelectionIndex === index && (
                                          <div
                                            key={
                                              Object.keys(data)[
                                                yourSelectionIndex
                                              ]
                                            }
                                            className={
                                              styles.yourSelectionSubContainer
                                            }
                                          >
                                            <div
                                              className={styles.labelContainer}
                                            >
                                              <CustomInputlabel
                                                htmlfor="text"
                                                label={Object.keys(data)}
                                              />
                                              :
                                            </div>
                                            {/* Check data type of values and accordingly display the content */}
                                            {Array.isArray(
                                              Object.values(data)[
                                                yourSelectionIndex
                                              ]
                                            )
                                              ? Object.values(data)[
                                                  yourSelectionIndex
                                                ].toString()
                                              : Object.values(data)}
                                          </div>
                                        )}
                                      </>
                                    );
                                  }
                                )}
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
              })}
          </div>

          {/* Count Bar  */}
          <div className="flex justify-between py-3">
            <div className="flex gap-3">
              <p>Pieces : {`${isCheck.length}/${rows.length}`}</p>
              <p>Avg. Dis : {averageDiscount.toFixed(2)}</p>
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
                          id: '1',
                          value: '1',
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
        {/* <CustomHeader data={headerData} /> */}
        <CustomDataTable
          tableRows={rows}
          tableColumns={tableColumns}
          checkboxData={checkboxData}
        />
        <div className="sticky bottom-0 bg-solitairePrimary mt-3">
          <CustomFooter footerButtonData={footerButtonData} />
        </div>
      </div>
    </>
  );
};

export default SearchResults;

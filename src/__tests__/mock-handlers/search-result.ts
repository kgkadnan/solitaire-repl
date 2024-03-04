import { rest } from 'msw';
import { server } from '.';
// import the server created for the entire test suite
// this mock server includes commonMswHandlers

const searchResultHandler = [
  rest.get(
    '/store/account/customer-manage-listing-sequence',
    (req, res, ctx) => {
      const listingColumns = [
        {
          label: 'Stock No',
          accessor: 'lot_id',
          sequence: 1,
          is_fixed: true,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ6XD0G39M0EN687CK2'
        },
        {
          label: 'Details',
          accessor: 'details',
          sequence: 2,
          is_fixed: true,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ6S7M6AHY61CG90VXQ'
        },
        {
          label: 'Shape',
          accessor: 'shape',
          sequence: 3,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ66EN9QCVM94SXAQQJ'
        },
        {
          label: 'CSI',
          accessor: 'color_shade_intensity',
          sequence: 6,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ6W60FCCYSGQ8P2DKQ'
        },
        {
          label: 'Carat',
          accessor: 'carat',
          sequence: 7,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ68CT77SBFSBQ88M6H'
        },
        {
          label: 'Clarity',
          accessor: 'clarity',
          sequence: 8,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ6NVD1SE5FJF68ZVVS'
        },
        {
          label: 'Discount%',
          accessor: 'discount',
          sequence: 9,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ6B8NJAAWS2AMBWT0C'
        },
        {
          label: 'Price/Carat',
          accessor: 'price_per_carat',
          sequence: 10,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ75RAGA2ZX1XR4Y12V'
        },
        {
          label: 'Amount($)',
          accessor: 'amount',
          sequence: 11,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ71HVAAYPRJA8132KE'
        },
        {
          label: 'Cut',
          accessor: 'cut',
          sequence: 12,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ7RZDRTD3TE2M5EMRY'
        },
        {
          label: 'Polish.',
          accessor: 'polish',
          sequence: 13,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ7CSR19Z297Z1ZDC67'
        },
        {
          label: 'Symmetry.',
          accessor: 'symmetry',
          sequence: 14,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ7YP19ZCTJZVHAFQPD'
        },
        {
          label: 'FLS',
          accessor: 'fluorescence',
          sequence: 15,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ795R2YSP618J3T2Z2'
        },
        {
          label: 'Ratio',
          accessor: 'ratio',
          sequence: 16,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ7VM4T24BTXHC4WCPK'
        },
        {
          label: 'LAB',
          accessor: 'lab',
          sequence: 17,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ7J9J467TFG6MN83VF'
        },
        {
          label: 'Location',
          accessor: 'location',
          sequence: 18,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ83CSW7FGDYR2M156K'
        },
        {
          label: 'RAP($)',
          accessor: 'rap',
          sequence: 19,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ84ENFJ4XT4S4HZ920'
        },
        {
          label: 'TBL%',
          accessor: 'table_percentage',
          sequence: 20,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ8AZRKE3P4ESY9Y72W'
        },
        {
          label: 'DEP%',
          accessor: 'depth_percentage',
          sequence: 21,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ8JG204MAFYRDF84R6'
        },
        {
          label: 'Length',
          accessor: 'length',
          sequence: 22,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ8JPKZMRJ24C35YSAP'
        },
        {
          label: 'Width',
          accessor: 'width',
          sequence: 23,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ8NMSF8P1XRRSQ1BTJ'
        },
        {
          label: 'Depth',
          accessor: 'depth',
          sequence: 24,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ8244ZDZ41WBXTAJ7S'
        },
        {
          label: 'Milky',
          accessor: 'milky',
          sequence: 25,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ8BW3JMYB916XTFE0Z'
        },
        {
          label: 'Luster',
          accessor: 'luster',
          sequence: 26,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ9ACR7CQ6WN32Q3C36'
        },
        {
          label: 'TB',
          accessor: 'table_black',
          sequence: 27,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ9FVZKSZNVYMT80BSR'
        },
        {
          label: 'SB',
          accessor: 'side_black',
          sequence: 28,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ9BK8JNTKXGZ7HXTGK'
        },
        {
          label: 'TI',
          accessor: 'table_inclusion',
          sequence: 29,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ9JMTZRGGFE6SNVPWN'
        },
        {
          label: 'SI',
          accessor: 'side_inclusion',
          sequence: 30,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ9QAWC63KNSTZ2TJER'
        },
        {
          label: 'Girdle',
          accessor: 'girdle',
          sequence: 31,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ91M6D42RXKMRA002R'
        },
        {
          label: 'Culet',
          accessor: 'culet',
          sequence: 32,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ983FVA5AC8AW8GQF4'
        },
        {
          label: 'C/A',
          accessor: 'crown_angle',
          sequence: 33,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ9PP12A2Y20QX3A19E'
        },
        {
          label: 'C/H',
          accessor: 'crown_height',
          sequence: 34,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZ97CJMJ2GTA24AGRWF'
        },
        {
          label: 'P/A',
          accessor: 'pavilion_angle',
          sequence: 35,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZAF2KAX3Q08G5MXAVB'
        },
        {
          label: 'P/D',
          accessor: 'pavilion_height',
          sequence: 36,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZAD584JQZJTMYCN3BJ'
        },
        {
          label: 'H&A',
          accessor: 'ha',
          sequence: 37,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZATWPKT3PP7SQDEW7F'
        },
        {
          label: 'Comments',
          accessor: 'rpt_comment',
          sequence: 38,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZADW9CSSBC374WX62F'
        },
        {
          label: 'Key to Symbols',
          accessor: 'key_to_symbols',
          sequence: 39,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZAFX0KK6NRH1001ECG'
        },
        {
          label: 'Tracr Id',
          accessor: 'tracr_id',
          sequence: 40,
          is_fixed: false,
          is_disabled: false,
          id: 'cus_ma-lis-seq_01HF9GYYZAD5JXX8WKXSP6ZPQG'
        }
      ];

      return res(ctx.json(listingColumns));
    }
  )
];

export const setupSetupSearchResultHandlers = () => {
  server.use(...searchResultHandler);
};

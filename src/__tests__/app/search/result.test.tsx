import React from 'react';

import { renderWithProviders } from '@/mock-handlers/test-utils';
import SearchResults from '@/app/search/result/result';
import {
  fireEvent,
  logDOM,
  logRoles,
  screen,
  waitFor
} from '@testing-library/react';
import { setupSetupSearchResultHandlers } from '@/mock-handlers/search-result';

describe('Render Search Result Page', () => {
  jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
  jest.mock('next/router', () => ({
    usePathname: jest.fn().mockReturnValue('/mocked-path')
  }));
  // Common test setup
  beforeEach(() => {
    const mockResponse = {
      products: [
        {
          id: 'prod_01HE36XX0GQX6N8AAZT9JWA6V7',
          title: null,
          subtitle: null,
          status: 'published',
          external_id: null,
          description: null,
          handle: 'handle2955',
          is_giftcard: false,
          discountable: true,
          thumbnail:
            'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/Cert/7478304962.Jpeg',
          collection_id: null,
          type_id: null,
          weight: 0.5,
          length: 5.39,
          height: null,
          width: 3.7,
          hs_code: null,
          origin_country: null,
          mid_code: null,
          material: null,
          created_at: '2023-10-31T15:49:58.791Z',
          updated_at: '2023-10-31T15:49:58.791Z',
          deleted_at: null,
          metadata: null,
          profile_id: 'sp_01HDGAAGY7Z6C2BCA07AXQRBA6',
          color: 'D',
          shape: 'EM',
          clarity: 'SI1',
          shape_detail: {
            name: 'EM',
            fullname: 'Emerald',
            id: '2',
            created_at: '2023-10-29T17:08:05.625Z',
            updated_at: '2023-10-29T17:08:05.625Z'
          },
          cut: null,
          polish: 'EX',
          symmetry: 'VG',
          fluorescence: 'NON',
          lab: 'GIA',
          rpt_number: '437369481',
          certificate_url:
            'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/Certificates/7478304962.pdf',
          girdle: 'THK to VTK',
          location: 'IND',
          color_shade: 'WH',
          color_shade_intensity: null,
          overtone: null,
          intensity: 'N',
          ha: null,
          brilliance: null,
          black_table: 'BPP',
          side_black: 'SB0',
          open_crown: 'N',
          open_table: 'VS',
          open_pavilion: 'VS',
          milky: 'M0',
          luster: 'EX',
          eye_clean: 'Y',
          table_inclusion: 'T2',
          side_inclusion: 'S1',
          natural_crown: 'N',
          natural_girdle: 'VS',
          natural_pavilion: 'N',
          surface_graining: 'G0',
          internal_graining: 'IG0',
          carat: 4.4,
          discount: -47.5,
          price_range: null,
          price_per_carat: 3000,
          girdle_percentage: 0,
          pavilion_angle: 0,
          star_length: 0,
          depth_percentage: 30,
          table_percentage: 68,
          crown_angle: 0,
          pavilion_depth: 0,
          crown_height: 0,
          lower_half: 0,
          ratio: 0,
          depth: 67.9,
          certificate_number: '7478304962',
          rap: 1000,
          rap_value: 1000,
          culet: 'NON',
          inscription: 'GIA 7478304962 ',
          tracr_id: null,
          total_grade: null,
          disclosed_source: null,
          is_memo_out: null,
          lot_id: '437369481',
          diamond_status: 'Active',
          in_cart: [
            {
              id: 'item_01HFB690E6YXK9JEFH25FRK0BS'
            }
          ],
          collection: null,
          images: [
            {
              id: 'img_01HE36XX0D5JP854GCN96XPKAX',
              created_at: '2023-10-31T15:49:58.791Z',
              updated_at: '2023-10-31T15:49:58.791Z',
              deleted_at: null,
              url: 'https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/Cert/7478304962.Jpeg',
              metadata: null
            }
          ],
          options: [
            {
              id: 'opt_01HE36XX0PAWH7XR3N409ERAMT',
              created_at: '2023-10-31T15:49:58.791Z',
              updated_at: '2023-10-31T15:49:58.791Z',
              deleted_at: null,
              title: 'diamond',
              product_id: 'prod_01HE36XX0GQX6N8AAZT9JWA6V7',
              metadata: null,
              values: [
                {
                  id: 'optval_01HE36XX15BHH96GG5AD53SFKK',
                  created_at: '2023-10-31T15:49:58.791Z',
                  updated_at: '2023-10-31T15:49:58.791Z',
                  deleted_at: null,
                  value: 'diamond',
                  option_id: 'opt_01HE36XX0PAWH7XR3N409ERAMT',
                  variant_id: 'variant_01HE36XX15BG1R5HW6TGCTQ4J6',
                  metadata: null
                }
              ]
            }
          ],
          profiles: [
            {
              id: 'sp_01HDGAAGY7Z6C2BCA07AXQRBA6',
              created_at: '2023-10-24T07:45:25.385Z',
              updated_at: '2023-10-24T07:45:25.385Z',
              deleted_at: null,
              name: 'Default Shipping Profile',
              type: 'default',
              metadata: null
            }
          ],
          tags: [],
          type: null,
          variants: [
            {
              id: 'variant_01HE36XX15BG1R5HW6TGCTQ4J6',
              created_at: '2023-10-31T15:49:58.791Z',
              updated_at: '2023-10-31T15:49:58.791Z',
              deleted_at: null,
              title: 'diamond',
              product_id: 'prod_01HE36XX0GQX6N8AAZT9JWA6V7',
              sku: null,
              barcode: null,
              ean: null,
              upc: null,
              variant_rank: 0,
              inventory_quantity: 100,
              allow_backorder: false,
              manage_inventory: true,
              hs_code: null,
              origin_country: null,
              mid_code: null,
              material: null,
              weight: null,
              length: null,
              height: null,
              width: null,
              metadata: null,
              options: [
                {
                  id: 'optval_01HE36XX15BHH96GG5AD53SFKK',
                  created_at: '2023-10-31T15:49:58.791Z',
                  updated_at: '2023-10-31T15:49:58.791Z',
                  deleted_at: null,
                  value: 'diamond',
                  option_id: 'opt_01HE36XX0PAWH7XR3N409ERAMT',
                  variant_id: 'variant_01HE36XX15BG1R5HW6TGCTQ4J6',
                  metadata: null
                }
              ],
              prices: [
                {
                  id: 'ma_01HE36XX1DAM8J9V9272MSQYJ6',
                  created_at: '2023-10-31T15:49:58.791Z',
                  updated_at: '2023-10-31T15:49:58.791Z',
                  deleted_at: null,
                  currency_code: 'usd',
                  amount: 1950,
                  min_quantity: null,
                  max_quantity: null,
                  price_list_id: null,
                  region_id: null,
                  price_list: null,
                  variant_id: 'variant_01HE36XX15BG1R5HW6TGCTQ4J6'
                }
              ],
              original_price: null,
              calculated_price: null,
              original_price_incl_tax: null,
              calculated_price_incl_tax: null,
              original_tax: null,
              calculated_tax: null,
              tax_rates: null
            }
          ]
        }
      ],
      count: 1,
      offset: 0,
      limit: 300
    };
    const refetch = jest.fn();
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(
        JSON.stringify([
          {
            saveSearchName: '',
            isSavedSearch: false,
            queryParams: {
              shape: ['EM'],
              clarity: ['SI1'],
              symmetry: ['VG'],
              black_table: ['BPP']
            }
          }
        ])
      )
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    setupSetupSearchResultHandlers();
    renderWithProviders(
      <SearchResults data={mockResponse} activeTab={1} refetch={refetch} />
    );
  });

  test('renders Search Result Page', async () => {
    await waitFor(() => {
      expect(screen.getByText(/pieces/i)).toHaveTextContent('0/1');
      expect(screen.getByText(/Total Avg. Dis/i)).toHaveTextContent('0.00');
      expect(screen.getByText(/Total Amount/i)).toHaveTextContent('$0.0');
      expect(screen.queryByText(/save this search/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId(`Select All Checkbox`));
    expect(screen.getByText(/pieces/i)).toHaveTextContent('1/1');
  });
});

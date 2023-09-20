import { rest } from 'msw';
import { server } from '.';
// import the server created for the entire test suite
// this mock server includes commonMswHandlers

const savedSearchandlers = [
  rest.get('/previous-search', (req, res, ctx) => {
    const mockApiResponse = {
      data: {
        previousSearch: [
          {
            diamond_count: 256,
            name: 'sample4',
            customer_id: 'cus_01H90HVS4396XG4A6D1PFMCXKX',
            meta_data: {
              cut: ['EX', 'IDEAL', 'VG'],
              lab: ['GIA', 'HRD', 'IGI'],
              color: ['D', 'F', 'E', 'G'],
              clarity: ['VVS2', 'VVS1', 'VS2'],
            },
            id: 'saved_search_01H95GDK1N1Q1RBWF5VF5JPD7K',
            created_at: '2023-08-31T09:57:31.317Z',
            updated_at: '2023-09-01T11:17:11.266Z',
          },
        ],
        totalPages: 3,
      },
    };

    return res(ctx.json(mockApiResponse));
  }),
];

export const setupSetupsavedSearchandlers = () => {
  server.use(...savedSearchandlers);
};

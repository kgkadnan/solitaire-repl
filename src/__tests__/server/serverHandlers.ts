import { rest } from 'msw';

const handlers = [
  rest.get('/previous-search', (req, res, ctx) => {
    const mockApiResponse = {
      previousSearch: [
        {
          diamond_count: 256,
          name: 'sample4',
          customer_id: 'cus_01H90HVS4396XG4A6D1PFMCXKX',
          is_deleted: false,
          meta_data: {
            cut: ['EX', 'IDEAL', 'VG'],
            lab: ['GIA', 'HRD', 'IGI'],
            color: ['D', 'F', 'E', 'G'],
            clarity: ['VVS2', 'VVS1', 'VS2'],
          },
          id: 'previous_search_01H95GDK1N1Q1RBWF5VF5JPD7K',
          created_at: '2023-08-31T09:57:31.317Z',
          updated_at: '2023-09-01T11:17:11.266Z',
        },
      ],
      totalPages: 4,
    };

    return res(ctx.json(mockApiResponse));
  }),
];

export { handlers };

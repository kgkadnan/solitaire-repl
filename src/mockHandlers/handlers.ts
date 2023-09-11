import { rest } from 'msw';

const handlers = [
  rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.post('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.patch('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.put('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.delete('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
];

export { handlers };

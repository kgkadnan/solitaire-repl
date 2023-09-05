import { setupServer } from 'msw/node';
import { handlers } from './serverHandlers';

const server = setupServer(...handlers);

export { server };

beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable the API mocking after the tests finished.
afterAll(() => server.close());

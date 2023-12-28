import pino from 'pino';

// Define log level based on environment
const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

const send = async function (level: any, logEvent: any) {
  const url = 'server-log-stream-url';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'token'
    },
    body: JSON.stringify([logEvent])
  });
  console.log(response);
};

// Configure logger with dynamic log level
const logger = pino({
  level: logLevel,
  browser: {
    serialize: true,
    asObject: true,
    transmit: {
      send
    }
  }
});

export default logger;

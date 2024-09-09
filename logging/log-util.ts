// // utils/logger.js
// import log from 'loglevel';

// log.setLevel('info');

// function sendLogToServer(level:any, message:any, additionalInfo = {}) {
//   fetch('/api/log', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ level, message, additionalInfo }),
//   }).catch((error) => console.error('Failed to send log to server', error));
// }

// // Override loglevel's method to send logs to the server
// const originalFactory = log.methodFactory;
// log.methodFactory = function (methodName, logLevel, loggerName) {
//   const rawMethod = originalFactory(methodName, logLevel, loggerName);

//   return function (message, ...optionalParams) {
//     rawMethod(message, ...optionalParams);
//     sendLogToServer(methodName, message, optionalParams);
//   };
// };

// // Initialize the method factory
// log.setLevel(log.getLevel());

// export default log;

// utils/logger.js
import log from 'loglevel';
import * as Sentry from '@sentry/nextjs';

// Set the logging level
log.setLevel('info');

// Custom function to send logs to Sentry
function sendLogToSentry(level: any, message: any, additionalInfo = {}) {
  if (level === 'error') {
    // Capture the error in Sentry
    Sentry.captureException(new Error(message), {
      extra: additionalInfo
    });
  } else {
    // Capture non-error messages as breadcrumbs or messages
    Sentry.addBreadcrumb({
      message,
      level,
      data: additionalInfo
    });
  }
}

// Override loglevel's method to send logs to Sentry
const originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);

  return function (message, ...optionalParams) {
    rawMethod(message, ...optionalParams);
    sendLogToSentry(methodName, message, optionalParams);
  };
};

// Initialize the method factory
log.setLevel(log.getLevel());

export default log;

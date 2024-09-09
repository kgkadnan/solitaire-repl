// utils/logger.js
import log from 'loglevel';

// Set the logging level (you can adjust this based on your environment)
log.setLevel('info');

// Custom function to send logs to the server
function sendLogToServer(level: any, message: any, additionalInfo = {}) {
  fetch('/api/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ level, message, additionalInfo })
  }).catch(error => console.error('Failed to send log to server', error));
}

// Override loglevel's method to send logs to the server
const originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);

  return function (message, ...optionalParams) {
    rawMethod(message, ...optionalParams);
    sendLogToServer(methodName, message, optionalParams);
  };
};

// Initialize the method factory
log.setLevel(log.getLevel());

export default log;

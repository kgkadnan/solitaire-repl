// import logLevelData from '../log-level';
// import pino, { Logger } from 'pino';
// import fs from 'fs';

// const logLevels = new Map<string, string>(Object.entries(logLevelData));

// const cerate = fs.createWriteStream('./my-logs.log');

// export function getLogLevel(logger: string): string {
//   return logLevels.get(logger) || logLevels.get('*') || 'info';
// }

// export function getLogger(name: string): Logger {
//   return pino(
//     {
//       name,
//       level: getLogLevel(name)

//       // ...(pino.version && pino.version.startsWith('7')
//       //   ? { prettyPrint: true }
//       //   : { destination: './my-logs.log' })
//     },
//     pino.destination(cerate)
//   );
// }

// // pino({})

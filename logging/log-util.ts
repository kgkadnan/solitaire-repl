// src/logging/log-util.ts

import * as Sentry from '@sentry/nextjs';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const levels: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

let currentLevel: number = levels.info;

export function setLogLevel(level: LogLevel): void {
  if (levels[level] !== undefined) {
    currentLevel = levels[level];
  }
}

export function log(level: LogLevel, message: any): void {
  if (levels[level] <= currentLevel) {
    // console[level](message);

    if (message) {
      // Ensure message is not null or undefined
      switch (level) {
        case 'error':
          Sentry.captureException(new Error(message));
          break;
        case 'warn':
          Sentry.captureMessage(message, 'warning');
          break;
        case 'info':
          Sentry.captureMessage(message, 'info');
          break;
        case 'debug':
          Sentry.captureMessage(message, 'debug');
          break;
      }
    } else {
      console.error('Log message is null or undefined');
    }
  }
}

export function error(message: any): void {
  log('error', message);
}

export function warn(message: any): void {
  log('warn', message);
}

export function info(message: any): void {
  log('info', message);
}

export function debug(message: any): void {
  log('debug', message);
}

export default {
  setLogLevel,
  error,
  warn,
  info,
  debug
};

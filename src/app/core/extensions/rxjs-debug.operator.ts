import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isDevMode } from '@angular/core';

export enum RxJsLoggingLevel {
  NONE,
  WARN,
  DEBUG,
  ERROR,
}

const enableRxJsLogging = true; // This can be toggled by code

let rxjsLoggingLevel = RxJsLoggingLevel.NONE;

export function setRxJsLoggingLevel(level: RxJsLoggingLevel) {
  rxjsLoggingLevel = level;
}

/**
 * Logs debug information for the given observable.
 * @param level - The logging level.
 * @param message - The log message.
 * @returns A function that takes an Observable and logs information based on the logging level.
 */
export function debug<T>(
  message: string,
  level = RxJsLoggingLevel.DEBUG,
  includeStackTrace = false
) {
  return (source: Observable<T>) =>
    source.pipe(
      tap((val) => {
        if (enableRxJsLogging && isDevMode()) {
          if (level >= rxjsLoggingLevel) {
            const typeInfo = typeof val;
            const stackTrace = includeStackTrace ? new Error().stack : ''; // Capture stack trace if needed
            const messageWithTypeInfo = `*${typeInfo}* ${message}:`;

            switch (level) {
              case RxJsLoggingLevel.ERROR:
                console.error(messageWithTypeInfo, val, stackTrace);
                break;
              case RxJsLoggingLevel.WARN:
                console.warn(messageWithTypeInfo, val, stackTrace);
                break;
              case RxJsLoggingLevel.DEBUG:
                console.log(messageWithTypeInfo, val, stackTrace);
                break;
            }
          }
        }
      })
    );
}

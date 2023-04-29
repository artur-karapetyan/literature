const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...messages: unknown[]) => {
    if (isDev) {
      console.log(...messages);
    }
  },
  error: (...messages: unknown[]) => {
    console.error(...messages);
  }
};

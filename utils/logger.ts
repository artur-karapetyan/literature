const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...messages: any[]) => {
    if (isDev) {
      console.log(...messages);
    }
  },
  error: (...messages: any[]) => {
    console.error(...messages);
  }
};

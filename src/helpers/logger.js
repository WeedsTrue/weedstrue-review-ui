import { PRODUCTION } from '../config/constants';

const logger = (...e) => {
  if (!PRODUCTION) {
    // eslint-disable-next-line no-console
    console.log(...e);
  }
};

export { logger };

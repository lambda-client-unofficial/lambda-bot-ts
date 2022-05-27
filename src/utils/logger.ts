/* eslint-disable no-console */
import colors from 'colors';

const log = (message: string) => {
  console.log(`${colors.gray(new Date().toLocaleString())} ${colors.cyan('[INFO]')} ${message}`);
};

const warn = (message: string) => {
  console.warn(`${colors.gray(new Date().toLocaleString())} ${colors.yellow('[WARN]')} ${message}`);
};

const error = (message: string) => {
  console.error(`${colors.gray(new Date().toLocaleString())} ${colors.red('[ERROR]')} ${message}`);
};

const logger = {
  log,
  warn,
  error,
}

export default logger;

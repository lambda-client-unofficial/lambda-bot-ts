/* eslint-disable no-console */
import colors from 'colors';
import fs from 'graceful-fs';
import readLastLines from 'read-last-lines';

class Logger {
  logName: string;

  constructor(logName: string | void) {
    if (!fs.existsSync('../../logs')) fs.mkdirSync('../../logs');
    if (!logName) { this.logName = `../../logs/${(new Date()).toString()}.txt`; } else { this.logName = logName; }
    fs.writeFileSync(this.logName, '');
  }

  log(message: string) {
    fs.appendFileSync(this.logName, `${(new Date()).toLocaleString()} [INFO] ${message}\n`);
    console.log(`${colors.gray((new Date()).toLocaleString())} ${colors.cyan('[INFO]')} ${message}`);
  }

  success(message: string) {
    fs.appendFileSync(this.logName, `${(new Date()).toLocaleString()} [SUCCESS] ${message}\n`);
    console.log(`${colors.gray((new Date()).toLocaleString())} ${colors.green('[SUCCESS]')} ${message}`);
  }

  warn(message: string) {
    fs.appendFileSync(this.logName, `${(new Date()).toLocaleString()} [WARN] ${message}\n`);
    console.warn(`${colors.gray((new Date()).toLocaleString())} ${colors.yellow('[WARN]')} ${message}`);
  }

  error(message: string) {
    fs.appendFileSync(this.logName, `${(new Date()).toLocaleString()} [ERROR] ${message}\n`);
    console.error(`${colors.gray((new Date()).toLocaleString())} ${colors.red('[ERROR]')} ${message}`);
  }

  last(amount: number | void) {
    return readLastLines.read(this.logName, amount ?? 10);
  }
}

const logger = new Logger();

export {
  Logger,
};

export default logger;

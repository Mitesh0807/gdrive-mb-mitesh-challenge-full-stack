import { createLogger, format, transports } from "winston";
import * as path from "path";
const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: path.basename(require!.main!.filename) }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()],
});

export default logger;

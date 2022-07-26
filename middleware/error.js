const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  res.status(500).send("Something failed.");
};

/**
 * Levels of error
 * - Error
 * - Warn
 * - Info
 * - Verbose
 * - Debug
 * - Silly
 */

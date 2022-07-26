const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("Fatal Error: jwtPrivateKey is not defined");
  }
};

/**
 * Store secret jwtPrivateKey as an environment variable
 * in the Server, Commands:
 *   - set vidly_jwtPrivateKey=`value`
 */
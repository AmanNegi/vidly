/**
 * Checks if user is admin
 * - 401 Unauthorized
 * - 403 Forbidden
 */
module.exports = function (req, res, next) {
  if (req.user.isAdmin) return res.status(403).send("Access Denied");

  next();
};

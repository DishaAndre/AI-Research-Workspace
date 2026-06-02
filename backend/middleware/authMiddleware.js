const jwt = require('jsonwebtoken');

/**
 * Access Request Guard Middleware
 * Decodes the cryptographic signature on incoming requests before granting route passage.
 */
module.exports = function (req, res, next) {
  // Extract token from Authorization header map
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied: Missing cryptographic authorization header metadata.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: Bearer token format structural mismatch.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Binds userId parameter matrix to the live request thread
    next();
  } catch (err) {
    res.status(400).json({ message: 'Access Denied: Token signature state is expired or corrupted.' });
  }
};
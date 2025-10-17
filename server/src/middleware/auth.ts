const jwt = require('jsonwebtoken');

function requireAuth(req: any, res: any, next:any) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Not logged in' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || '');
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = requireAuth;

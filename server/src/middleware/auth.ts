const jwt = require('jsonwebtoken');
const { pool } = require('../db/index');

async function Authentication(req:any, res:any, next:any) {
  const token = req.cookies?.token;
  
  if (!token) {
    // No token - let the route handle redirection to Google auth
    return res.status(401).json({ message: 'Not logged in' });
  }

  try {
    // Verify JWT and get user data from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    
    // Just verify user exists and get their ID
    const userResult = await pool.query(
      'SELECT id FROM users WHERE sub = $1',
      [decoded.sub]
    );

    if (!userResult.rows.length) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user ID to request
    req.user = {
      id: userResult.rows[0].id,
      ...decoded
    };
    
    console.log('Authenticated User:', req.user);
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = {Authentication};

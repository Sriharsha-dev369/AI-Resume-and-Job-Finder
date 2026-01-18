import type { Request, Response, NextFunction } from 'express';  
const { pool } = require('../db/index');

async function verifyResumeOwnership(req: any, res: Response, next: NextFunction) {
  try {
    const { resumeId } = req.params;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - No user ID found'
      });
    }

    // Check if resume exists and belongs to user
    const result = await pool.query(
      'SELECT id FROM resumes WHERE id = $1 AND user_id = $2',
      [resumeId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found or you do not have permission to access it'
      });
    }

    // Resume exists and belongs to user, proceed
    next();
  } catch (error) {
    console.error('Error verifying resume ownership:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while verifying resume ownership'
    });
  }
}

module.exports = { verifyResumeOwnership };
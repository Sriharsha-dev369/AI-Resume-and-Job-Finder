const multer = require('multer');
const pdfParse = require('pdf-parse');
const { Pool } = require('pg');
const { parseResume } = require('../lib/index'); // your parsing file

const pool = new Pool();
const upload = multer({ storage: multer.memoryStorage() ,
  limits:{filesize : 5*1024*1024},
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

async function uploadAndStoreResume(req: any, res: any) {
  try {
    const userId = req.user.id;
    
    // Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const rawText = pdfData.text;
    
    // Parse using your existing handlers
    const parsedData = await parseResume(rawText);
    
    // Store in database
    await pool.query(
      `INSERT INTO resumes (user_id, parsed_data, filename)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id) 
       DO UPDATE SET parsed_data = $2, filename = $3, uploaded_at = CURRENT_TIMESTAMP`,
      [userId, JSON.stringify(parsedData), req.file.originalname]
    );
    
    res.json({ success: true, data: parsedData });
    
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { uploadAndStoreResume, upload };
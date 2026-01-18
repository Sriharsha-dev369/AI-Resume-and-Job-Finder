const multer = require("multer");
const pdfParse = require("pdf-parse");
const { pool } = require("../db/index");
const { parseResume } = require("../lib/pdfParser");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { filesize: 5 * 1024 * 1024 },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

async function uploadAndStoreResume(req: any, res: any) {
  try {
    const userId = req.user.id;

    // Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const rawText = pdfData.text;

    // Parse using your existing handlers
    const parsedData = await parseResume(rawText);
    // console.log('Parsed Resume Data:', parsedData);
    // console.log(parsedData);

    console.log(parsedData);

    // Store in databaselll
    await pool.query(
      `INSERT INTO resumes (user_id, parsed_data, filename)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id) 
       DO UPDATE SET parsed_data = $2, filename = $3, uploaded_at = CURRENT_TIMESTAMP`,
      [userId, JSON.stringify(parsedData), req.file.originalname],
    );

    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function createResume(req: any, res: any) {
  const userId = req.user.id;

  try {
    const existing = await pool.query(
      `SELECT id FROM resumes WHERE user_id = $1 ORDER BY created_at LIMIT 1`,
      [userId],
    );

    let resumeId;

    if (existing.rows.length > 0) {
      resumeId = existing.rows[0].id;
    } else {
      const created = await pool.query(
        `INSERT INTO resumes (user_id,title,raw_parsed_data)
        VALUES($1,$2,$3)
        RETURNING id`,
        [userId, "Untitled Resume", JSON.stringify({})],
      );
      resumeId = created.rows[0].id;
    }
    res.json({ resumeId });
  } catch (err: any) {
    console.error("Error creating resume:", err);
    res.status(500).json({
      error: "Failed to create Resume",
      message: err.message,
    });
  }
}

async function getPersonalInfo(req: any, res: any) {
  try {
    const { resumeId } = req.params;
    const result = await pool.query(
      "SELECT * FROM resume_basic_info WHERE resume_id = $1",
      [resumeId]
    );
    
    if (result.rows.length === 0) {
      return res.status(200).json({}); // Return empty object if not found
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

async function addPersonalInfo(req: any, res: any) {
  try {
    const { resumeId } = req.params;
    const { name, email, phone, linkedin, github, website, address } = req.body;

    const existingInfo = await pool.query(
      "SELECT id FROM resume_basic_info WHERE resume_id = $1",
      [resumeId],
    );

    let result;

    if (existingInfo.rows.length > 0) {
      result = await pool.query(
        "UPDATE resume_basic_info SET name = $1 ,email = $2, phone = $3, linkedin = $4, github = $5, website = $6, address = $7 WHERE resume_id = $8 RETURNING *",
        [name, email, phone, linkedin, github, website, address, resumeId],
      );
    } else {
      result = pool.query(
        `INSERT INTO resume_basic_info
      (resume_id , name , email , phone , linkedin , github , website , address)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
        [resumeId, name, email, phone, linkedin, github, website, address],
      );
    }

    return res.status(200).json({
      success: true,
      message: "Personal info saved successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error in add PersonalInfo',error);
    return res.status(500).json({
      success:false,
      message:'Internal server error while saving personal info'
    });
  }
}

module.exports = {
  uploadAndStoreResume,
  upload,
  createResume,
  getPersonalInfo,
  addPersonalInfo,
};

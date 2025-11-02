require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const resume = require('./routes/resumeRoute');
const auth = require('./routes/authRoutes');
const page = require('./routes/pageRoutes');
console.log('pageRoutes:', page); // Debug import
const { pool } = require('./db/index');

const app: any = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

const corsOptions: any = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  optionsSuccessStatus: 200,
};

// Apply CORS globally
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', page);
app.use('/api/resume', resume);
app.use('/auth', auth);

// Custom 404 handler
app.use((req: any, res: any) => {
  res.status(404).json({ error: `Route ${req.url} not found` });
});

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
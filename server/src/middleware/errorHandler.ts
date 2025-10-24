

const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
};
module.exports = errorHandler;

upload.single('resume'), // Error happens here if fileFilter rejects
(err, req, res, next) => {  // Error handling middleware
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
}
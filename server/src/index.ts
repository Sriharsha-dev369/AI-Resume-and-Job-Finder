require('dotenv').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const resume = require("./routes/resumeRoute");
const auth = require("./routes/authRoutes");
const page = require("./routes/pageRoutes");
const pool = require("./db/index"); 

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  allowHeaders: ["Content-Type", "Authorization", "Cookie"],
};

app.use(express.json());
//converts JSON(structuring data) and JSONstring(for storing and transfering data) to JSobject(for manipulation)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors('/api',corsOptions,page));
app.use("/api/resume", cors(corsOptions),resume);
app.use("/auth", cors(corsOptions), auth);


app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});


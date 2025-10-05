import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import tasks from "./routes/taskRoutes.js";
import auth from "./routes/authRoutes.js";

const app = express();
const PORT = 8000;

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


// app.use("/api/tasks", cors(corsOptions), tasks);
app.use("/api/auth", cors(corsOptions), auth);



app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});


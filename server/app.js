import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 6010


app.use(cors());

app.get("/render", (req, res) => {
  res.json({
    message: "Server Working on render",
    frontendUrl: PORT,
    database: process.env.MONGO_URI,
    frontendUrl12334: PORT ,
    CLOUDINARY_CLIENT_SECRET :process.env.CLOUDINARY_CLIENT_SECRET ,
    CLOUDINARY_CLIENT_API :process.env.CLOUDINARY_CLIENT_API ,
    CLOUDINARY_CLIENT_NAME :process.env.CLOUDINARY_CLIENT_NAME 
  });
  console.log(process.env.FRONTEND_URL);
});


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.MONGO_URI);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

dbConnection();

app.use(errorMiddleware);

export default app;

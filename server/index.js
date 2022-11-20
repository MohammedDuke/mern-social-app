import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { regsiter } from "./controllers/auth.js";

// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
// ROUTES
app.post("/auth/register", upload.single("picture"), regsiter);

// ROUTER
app.use("/auth", authRoutes);

// SETUP MONGODB AND EXPRESS SERVER
const PORT = process.env.PORT || 6001;
const server = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () =>
      console.log(`Server is Runing in http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

server();

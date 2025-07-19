import express from 'express';
import cors from "cors";
import router from "./routes/notesRoutes.js"
import {connectDB} from './config/db.js'
import dotenv from 'dotenv';
import path from 'path'
import rateLimiter from './middleware/rateLimiter.js'
dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

connectDB();

if(process.env.NODE_ENV !== "production"){
  app.use(cors(
  {origin: "http://localhost:5173",}
))
}
app.use(express.json());
app.use(rateLimiter)


app.use("/api/notes" , router)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
});
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
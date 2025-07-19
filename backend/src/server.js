import express from 'express';
import cors from "cors";
import router from "./routes/notesRoutes.js"
import {connectDB} from './config/db.js'
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js'
dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(cors(
  {origin: "http://localhost:5173",}
))
app.use(express.json());
app.use(rateLimiter)


app.use("/api/notes" , router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
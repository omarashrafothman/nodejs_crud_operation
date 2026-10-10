import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandlers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

const port = process.env.PORT || 3001;

//middlewares

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
//routes

// error handling middleware

app.use(errorHandler);

//server running

sequelize
  .sync()
  .then((result) => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log("Error syncing database", err));

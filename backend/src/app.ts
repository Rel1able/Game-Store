import express from "express";
import authRoutes from "./routes/authRoutes.js" 
import gameRoutes from "./routes/gameRoutes.js"

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/game", gameRoutes);

export default app;
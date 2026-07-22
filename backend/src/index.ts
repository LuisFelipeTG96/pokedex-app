import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/router";

// Initialize dotenv to load environment variables from .env file
dotenv.config();

const app: Application = express();

app.use(cors()); // Enable CORS for all routes

// Use Helmet for setting security-related HTTP headers
app.use(helmet());

// Use Morgan for logging HTTP requests
app.use(morgan("dev"));

// Middleware to parse JSON bodies
app.use(express.json());

// Use the router for handling routes
app.use("/api", router);

// Handle 404 errors for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Define a simple route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

export default app;
import express from "express";
import carRoutes from "./routes/carRoutes.js";

const app = express();
const PORT = 5000;

// Middleware to log requests
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} - Status: ${res.statusCode}`);
  });
  next();
});

app.use(express.json());

app.use("/api", carRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

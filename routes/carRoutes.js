import express from "express";
import cars from "../data/carsData.js";

const router = express.Router();
let carsData = [...cars]; // Creating a mutable copy of cars array

// Middleware to validate required fields
const validateCar = (req, res, next) => {
  const { carName, carType, releaseYear } = req.body;

  if (!carName || !carType || !releaseYear) {
    return res.status(400).json({ message: "Missing required fields: carName, carType, releaseYear" });
  }

  next();
};

// Get all cars
router.get("/cars", (req, res) => {
  res.status(200).json(carsData);
});

// Get a car by ID
router.get("/cars/:id", (req, res) => {
  const car = carsData.find((c) => c.id === req.params.id);
  car ? res.status(200).json(car) : res.status(404).json({ message: "Car not found" });
});

// Add a new car
router.post("/cars", validateCar, (req, res) => {
  const { carName, carType, releaseYear } = req.body;
  const newCar = { id: String(carsData.length + 1), carName, carType, releaseYear };

  carsData.push(newCar);
  res.status(201).json(newCar);
});

// Update a car by ID
router.put("/cars/:id", validateCar, (req, res) => {
  const carIndex = carsData.findIndex((c) => c.id === req.params.id);

  if (carIndex !== -1) {
    carsData[carIndex] = { ...carsData[carIndex], ...req.body };
    res.status(200).json(carsData[carIndex]);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

// Delete a car by ID
router.delete("/cars/:id", (req, res) => {
  const carIndex = carsData.findIndex((c) => c.id === req.params.id);

  if (carIndex !== -1) {
    carsData = carsData.filter((c) => c.id !== req.params.id);
    res.status(200).json({ message: "Car deleted successfully" });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

export default router;

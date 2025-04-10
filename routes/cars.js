const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

const carsController = require("../controllers/cars");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

// Middleware to validate MongoDB ObjectId
router.param("id", (req, res, next, id) => {
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  next();
});

// Routes
router.get("/", carsController.getAll);
router.get("/:id", carsController.getSingle);
router.post("/", validation.saveCars, carsController.createCars);
router.put("/:id", validation.saveCars, carsController.updateCars);
router.delete("/:id", carsController.deleteCars);
router.post("/", isAuthenticated, carsController.createCars);
router.put("/:id", isAuthenticated, carsController.updateCars);
router.delete("/:id", isAuthenticated, carsController.deleteCars);

module.exports = router;

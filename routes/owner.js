const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

const ownerController = require("../controllers/owner");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

// Middleware to validate MongoDB ObjectId
router.param("id", (req, res, next, id) => {
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid owner ID format" });
  }
  next();
});

// Routes
router.get("/", ownerController.getAll);
router.get("/:id", ownerController.getSingle);
router.post("/", validation.saveOwner, ownerController.createOwner);
router.put("/:id", validation.saveOwner, ownerController.updateOwner);
router.delete("/:id", ownerController.deleteOwner);
router.post("/", isAuthenticated, ownerController.createOwner);
router.put("/:id", isAuthenticated, ownerController.updateOwner);
router.delete("/:id", isAuthenticated, ownerController.deleteOwner);

module.exports = router;

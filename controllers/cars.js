const db = require("../data/db");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  try {
    const database = db.getDatabase();
    const cars = await database.collection("cars").find().toArray(); // Just use `collection`

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(cars);
  } catch (error) {
    console.error("❌ Error fetching all cars:", error);
    res.status(500).json({ error: "Failed to fetch cars" });
};
};



// Get a single car by ID
const getSingle = async (req, res) => {
  try {
    const carId = new ObjectId(req.params.id);
    const database = db.getDatabase();
    const result = await database.collection("cars").findOne({ _id: carId });

    if (!result) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error fetching single car:", error);
    res.status(500).json({ error: "Failed to fetch car" });
  }
};

// ✅ Create a new car
const createCars = async (req, res) => {
  try {
    const car = {
      model: req.body.model,
      make: req.body.make,
      miles: Number(req.body.miles),
      color: req.body.color,
      year: Number(req.body.year),
      engine: req.body.engine,
      price:  Number(req.body.price),
      registration: req.body.registration,
    };

    // 📌 Get the database instance
    const database = db.getDatabase();
const response = await database.collection("cars").insertOne(car);

    // 📌 Check if insertion was successful
    if (response.acknowledged) {
      res.status(201).json({ message: "Car created successfully", carId: response.insertedId });
    } else {
      res.status(500).json({ error: "Failed to create car" });
    }
  } catch (error) {
    console.error("❌ Error creating car:", error);
    res.status(500).json({ error: "An error occurred while creating the car." });
  }
};


// Update an existing car
const updateCars = async (req, res) => {
  try {
    const carId = new ObjectId(req.params.id);
    const updatedCar = {
      $set: {
        make: req.body.make,
        model: req.body.model,
        miles: req.body.miles,
        color: req.body.color,
        year: req.body.year,
        engine: req.body.engine,
        price: req.body.price,
        registration: req.body.registration,
      },
    };

    const response = await db.getDatabase().collection("cars").updateOne({ _id: carId }, updatedCar);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Car updated successfully" });
    } else {
      res.status(404).json({ error: "Car not found or no changes made" });
    }
  } catch (error) {
    console.error("❌ Error updating car:", error);
    res.status(500).json({ error: "Failed to update car" });
  }
};

// Delete a car
const deleteCars = async (req, res) => {
  try {
    const carId = new ObjectId(req.params.id);
    const response = await db.getDatabase().collection("cars").deleteOne({ _id: carId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    console.error("❌ Error deleting car:", error);
    res.status(500).json({ error: "Failed to delete car" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCars,
  updateCars,
  deleteCars,
};

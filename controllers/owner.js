// Import required modules
const db = require("../data/db");
const { ObjectId } = require("mongodb");

// Controller function to get all owners
const getAll = async (req, res) => {
  try {
    const database = db.getDatabase();
    const result = await database.collection("owner").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error fetching all owners:", error);
    res.status(500).json({ error: "Failed to fetch owners" });
  }
};

// Controller function to get a single owner by ID
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid owner ID" });
    }

    const ownerId = new ObjectId(req.params.id);
    const database = db.getDatabase();
    const result = await database.collection("owner").findOne({ _id: ownerId });

    if (!result) {
      return res.status(404).json({ error: "Owner not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error fetching single owner:", error);
    res.status(500).json({ error: "Failed to fetch owner" });
  }
};

// Controller function to create a new owner
const createOwner = async (req, res) => {
  try {
    const { firstname, lastname, email, color, birthday, city, phone } =
      req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !color ||
      !birthday ||
      !city ||
      !phone
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const owner = { firstname, lastname, email, color, birthday, city, phone };
    const database = db.getDatabase();
    const response = await database.collection("owner").insertOne(owner);

    if (response.acknowledged) {
      res.status(201).json({ message: "Owner created successfully", owner });
    } else {
      res.status(500).json({ error: "Failed to create owner" });
    }
  } catch (error) {
    console.error("❌ Error creating owner:", error);
    res.status(500).json({ error: "Failed to create owner" });
  }
};

// Controller function to update an existing owner
const updateOwner = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid owner ID" });
    }

    const ownerId = new ObjectId(req.params.id);
    const updatedOwner = {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        color: req.body.color,
        birthday: req.body.birthday,
        city: req.body.city,
        phone: req.body.phone,
      },
    };

    const database = db.getDatabase();
    const response = await database
      .collection("owner")
      .updateOne({ _id: ownerId }, updatedOwner);

    if (response.matchedCount === 0) {
      return res.status(404).json({ error: "Owner not found" });
    }

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Owner updated successfully" });
    } else {
      res.status(200).json({ message: "No changes made to owner" });
    }
  } catch (error) {
    console.error("❌ Error updating owner:", error);
    res.status(500).json({ error: "Failed to update owner" });
  }
};

// Controller function to delete an existing owner
const deleteOwner = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid owner ID" });
    }

    const ownerId = new ObjectId(req.params.id);
    const database = db.getDatabase();
    const response = await database
      .collection("owner")
      .deleteOne({ _id: ownerId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Owner not found" });
    }
  } catch (error) {
    console.error("❌ Error deleting owner:", error);
    res.status(500).json({ error: "Failed to delete owner" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createOwner,
  updateOwner,
  deleteOwner,
};

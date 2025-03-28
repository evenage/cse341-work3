const router = require("express").Router();

// Swagger documentation route
router.use("/", require("./swagger"));

// Cars and owners routes
router.use("/cars", require("./cars"));
router.use("/owners", require("./owner"));

module.exports = router;

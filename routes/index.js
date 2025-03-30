const router = require("express").Router();

// Swagger documentation route
router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swagger-tags: ['Hello from routes!']
    res.send("Hello, from routes!");
  });
  

// Cars and owners routes
router.use("/cars", require("./cars"));
router.use("/owner", require("./owner"));

module.exports = router;

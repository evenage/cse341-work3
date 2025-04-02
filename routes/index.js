const router = require("express").Router();
const passport = require("passport");


// Swagger documentation route
router.use("/", require("./swagger"));

// router.get("/", (req, res) => {
//     //#swagger-tags: ['Hello from routes!']
//     res.send("Hello, from routes!");
//   });
  

// Cars and owners routes
router.use("/cars", require("./cars"));
router.use("/owner", require("./owner"));

router.get("/login", passport.authenticate("github"), (req,res) => {});
router.get("logout", function(req,res, next){
  req.logout(function(err){
    if(err) { return next(err); }
    res.redirect("/");
  });
});

module.exports = router;

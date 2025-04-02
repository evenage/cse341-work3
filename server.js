require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./data/db");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const port = process.env.PORT || 3000;


// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] }));

// CORS Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/", require("./routes/index.js"));

// Initialize Passport with GitHub strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Access Token:", accessToken);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user); 
});

// Routes
app.get("/", (req, res) => {
  res.send(req.session.user ? `Logged in as ${req.session.user.displayName}` : "Logout");
});

app.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/api-docs", session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

db.initDb((err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1); // Exit if database connection fails
  } else {
    app.listen(port, () => {
      console.log(`Database is connected and server running on port ${port}`);
    });
  }
});

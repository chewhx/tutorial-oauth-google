require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");

const connectDB = require("./config/connectDB");
connectDB();

const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");

// set up view engine
app.set("view engine", "ejs");

// encryp the user after serlizaition in passport
app.use(
  cookieSession({
    maxAge: 60 * 1000,
    keys: [process.env.SECRET],
  })
);

// initalize passport
app.use(passport.initialize());
app.use(passport.session());

// set up passport
const passportSetup = require("./config/passport-setup");

// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create root route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

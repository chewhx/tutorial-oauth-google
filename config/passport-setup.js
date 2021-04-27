const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      callbackURL: "/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      // passport callback function

      // check if user already exist in our db
      const existUser = await User.findOne({ googleId: profile.id });

      if (existUser) {
        console.log(`existing user is: ${existUser}`);
        // pass the user object to the serialize function
        done(null, existUser);
      }

      if (!existUser) {
        const newUser = await User.create({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.image.url,
        });
        console.log(`new user created is ${newUser}`);
        // pass the user object to the serialize function
        done(null, newUser);
      }
    }
  )
);

// create a unique cookie/token
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// deseralise the User
passport.deserializeUser(async (id, done) => {
  const foundUser = await User.findById(id);
  done(null, foundUser);
});

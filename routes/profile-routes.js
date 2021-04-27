const router = require("express").Router();

const authUser = (req, res, next) => {
  if (!req.user) res.redirect("/auth/login");
  if (req.user) next();
};

router.get("/", authUser, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;

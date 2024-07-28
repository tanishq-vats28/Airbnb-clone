const User = require("../models/user.js");
const renderSignupForm = (req, res) => {
  res.render("user/signup.ejs");
};
const addUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({
      email: email,
      username: username,
    });
    let data = await User.register(newUser, password);
    req.login(data, (err) => {
      if (err) {
        next(err);
      }
      req.flash("success", "Welcome to Airbnb-clone");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/user/signUp");
  }
};
const renderLoginForm = (req, res) => {
  res.render("user/login.ejs");
};
const loginUser = (req, res) => {
  req.flash("success", "Welcome Back to Airbnb-clone");
  let prevPath = res.locals.redirectUrl || "/listings";
  res.redirect(prevPath);
};
const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out Successfully");
    res.redirect("/listings");
  });
};
module.exports = {
  renderSignupForm,
  addUser,
  renderLoginForm,
  loginUser,
  logout,
};

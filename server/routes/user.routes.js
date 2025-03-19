const { signup, signout, signin, getuser } = require("../controllers/user.controller");

const route = require("express").Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.post("/signout", signout);
route.get("/getuser", getuser)

module.exports = route;
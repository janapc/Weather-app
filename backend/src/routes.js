const express = require("express");
const UserController = require("./controller/UserController");
const SessionController = require("./controller/SessionController");
const LoginController = require("./controller/LoginController");
const LikeController = require("./controller/LikeController");
const DislikeController = require("./controller/DislikeController");

const routes = express.Router();
// create user
routes.post("/user", UserController.store);
// create session
routes.post("/session", SessionController.store);
// user not Logged
routes.post("/login", LoginController.store);
// user Logged
routes.get("/login", LoginController.index);
// like and dislike
routes.post("/user/like", LikeController.store);
routes.get("/user/like", LikeController.index);
routes.delete("/user/:cityId/dislike", DislikeController.store);

module.exports = routes;

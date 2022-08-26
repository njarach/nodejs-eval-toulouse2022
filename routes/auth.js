const authRouter = require("express").Router();

const passportJWT = require("../middlewares/passportJWT")();
const authController = require("../controllers/authController");

authRouter.post("/user/login", authController.login);
authRouter.post("/user/signup", authController.signup);

authRouter.get("/me", passportJWT.authenticate(), authController.me);

module.exports = authRouter;
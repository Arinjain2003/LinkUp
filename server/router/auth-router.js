const express = require("express");
const router = express.Router();
const authcontroler  = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validators");
const loginSchema = require("../validators/auth-validators");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authcontroler.home);

router.route("/register").post( validate(signupSchema), authcontroler.register);

router.route("/login").post(authcontroler.login);

router.route('/user').get(authMiddleware, authcontroler.user);


module.exports = router;
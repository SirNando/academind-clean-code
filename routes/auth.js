const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers')

router.get("/signup", authControllers.getSignup);

router.get("/login", authControllers.getLogin);

router.post("/signup", authControllers.signupUser);

router.post("/login", authControllers.signinUser);

router.post("/logout", authControllers.logout);

router.get('/401', authControllers.get401);

module.exports = router;

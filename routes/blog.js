const express = require("express");
const blogControllers = require("../controllers/post-controllers");
const guardRoute = require('../middlewares/auth-protection-middleware');

const router = express.Router();

router.get("/", blogControllers.getHome);

router.use(guardRoute); // Every route after this line will require authentication

router.get("/admin", blogControllers.getAdmin);

router.post("/posts", blogControllers.createPost);

router.get("/posts/:id/edit", blogControllers.editPost);

router.post("/posts/:id/edit", blogControllers.savePost);

router.post("/posts/:id/delete", blogControllers.deletePost);

module.exports = router;

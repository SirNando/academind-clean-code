const Post = require("../models/post");
const validationSession = require("../utils/session-validation");
const inputValidation = require("../utils/input-validation");

function getHome(req, res) {
  res.render("welcome");
}

async function getAdmin(req, res) {

  const posts = await Post.fetchAll();

  const sessionInputData = validationSession.getSessionErrorData(req);

  res.render("admin", {
    posts: posts,
    inputData: sessionInputData,
  });
}

async function createPost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!inputValidation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect("/admin");
      }
    );
    return; // or return res.redirect('/admin'); => Has the same effect
  }

  const newPost = new Post(enteredTitle, enteredContent);
  await newPost.save();

  res.redirect("/admin");
}

async function editPost(req, res, next) {
  let post;
  try {
    post = new Post(null, null, req.params.id);
  } catch (error) {
    return next(error);
  }

  await post.fetch();

  if (!post.title || !post.content) {
    return res.render("404"); // 404.ejs is missing at this point - it will be added later!
  }

  const sessionInputData = validationSession.getSessionErrorData(req, {
    title: post.title,
    content: post.content,
  });

  res.render("single-post", {
    post: post,
    inputData: sessionInputData,
  });
}

async function savePost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!inputValidation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect(`/posts/${req.params.id}/edit`);
      }
    );
    return;
  }

  const selectedPost = new Post(enteredTitle, enteredContent, req.params.id);
  await selectedPost.save();

  res.redirect("/admin");
}

async function deletePost(req, res) {
  const selectedPost = new Post(null, null, req.params.id);
  await selectedPost.delete();

  res.redirect("/admin");
}

module.exports = {
  getHome,
  getAdmin,
  createPost,
  editPost,
  savePost,
  deletePost,
};

const db = require("../data/database");

function postIsValid(title, content) {
  if (title && content && title.trim() !== "" && content.trim() !== "") {
    return true;
  } else {
    return false;
  }
}

function signupCredentialsAreValid(email, password, confirmedemail) {
  if (
    email &&
    password &&
    confirmedemail &&
    password.trim().length >= 6 &&
    email === confirmedemail &&
    email.includes("@")
  ) {
    return true;
  } else {
    return false;
  }
}

async function userExists(email) {
  const res = await db.getDb().collection("users").findOne({ email: email });
  return res;
}

module.exports = {
  postIsValid,
  signupCredentialsAreValid,
  userExists,
};

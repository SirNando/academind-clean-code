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

module.exports = {
  postIsValid,
  signupCredentialsAreValid,
};

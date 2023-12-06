const validatePassword = (input: string) => {
  let passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*()_+{}|:;<>,.?~])(?=.*[a-zA-Z]).{8,}$/;

  if (input.match(passwordRegex)) {
    return true;
  } else {
    return false;
  }
};

export default validatePassword;

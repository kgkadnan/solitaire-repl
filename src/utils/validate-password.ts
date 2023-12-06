const validatePassword = (input: string) => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*()_+{}|:;<>,.?~])(?=.*[a-zA-Z]).{8,}$/;

  if (input.match(passwordRegex)) {
    return true;
  } else {
    return false;
  }
};

export default validatePassword;

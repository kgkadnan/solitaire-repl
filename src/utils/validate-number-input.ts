// validationUtils.js

function validateNumberInput(input: string) {
  if (!/^[0-9]*\.?[0-9]*$/.test(input)) {
    return false;
  }

  return true;
}

export { validateNumberInput };

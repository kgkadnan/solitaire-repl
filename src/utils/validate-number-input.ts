// validationUtils.js

function validateNumberInput(input: any) {
  const inputValue = input.value;

  if (!/^[0-9]*\.?[0-9]*$/.test(inputValue)) {
    return false;
  }

  return true;
}

export { validateNumberInput };

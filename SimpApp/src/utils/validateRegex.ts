/**
 * Validates a value against a regular expression pattern.
 * @param {string} value - The value to be validated.
 * @param {string} regexString - The regular expression pattern as a string.
 * @returns {boolean} Returns true if the value matches the regular expression, false otherwise.
 */
export const validateRegex = (value: string, regexString: string): boolean => {
  if (!value || !regexString) {
    return false;
  }

  const regexPattern = new RegExp(regexString);

  return regexPattern.test(value);
};

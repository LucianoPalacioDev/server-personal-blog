/**
 * Validates whether an email address is in a valid format.
 *
 * This function uses a regular expression to check if the provided email
 * address conforms to a general pattern of an email address. The pattern
 * requires that the email contains exactly one "@" symbol, at least one 
 * character before and after the "@" symbol, and at least one "." after 
 * the "@" symbol with at least one character following it. It does not 
 * allow spaces anywhere in the email address.
 *
 * @param {string} email The email address to validate.
 * @returns {boolean} Returns `true` if the email address matches the pattern
 *                    indicating a valid format. Returns `false` otherwise.
 */
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validates whether a password meets certain security criteria.
 *
 * The function checks if the provided password has a minimum length,
 * contains at least one uppercase letter, at least one number, and at least one
 * special symbol from a defined set.
 * 
 * @param {string} password The password to validate.
 * @returns {boolean} Returns `true` if the password meets all the security criteria.
 *                    Returns `false` otherwise.
 */
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && hasUpperCase && hasNumber && hasSymbol;
};

module.exports = {
  validateEmail,
  validatePassword,
};

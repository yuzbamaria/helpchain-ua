import zxcvbn from "zxcvbn";

// returns error msg (string) or null (valid passoword)
export function validatePassword(password: string): string | null {
  const score = zxcvbn(password).score;

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must include a lowercase letter.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must include an uppercase letter.";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must include a number.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must include a special character.";
  }

  if (/\s/.test(password)) {
    return "Password must not contain spaces.";
  }

  if (score < 3) {
    return "Password is too weak — try making it longer or more complex.";
  }

  return null;
}

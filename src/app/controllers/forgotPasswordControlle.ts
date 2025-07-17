// coordinates input and output

import { passwordResetService } from "../services/forgotPasswordService"; 

export async function passwordResetController(email: string) {
  if (!email) throw new Error("Email is required");
  await passwordResetService(email);
};
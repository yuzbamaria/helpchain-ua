import axios from "axios";

export async function resetPasswordRequest({
  newPassword,
  token,
}: {
  newPassword: string;
  token: string;
}) {
  return axios.post("/api/reset-password", { newPassword, token });
}
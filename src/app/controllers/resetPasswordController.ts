import { resetPasswordService } from "../services/resetPasswordService";

export async function resetPasswordController(token: string, newPassword: string) {
    if(!token || !newPassword) {
        throw new Error("Missing token or new password");
    };

    await resetPasswordService(token, newPassword);
};
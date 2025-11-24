// mail utility
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  await transporter.sendMail({
    from: `"HelpChain" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset your password",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset</title>
          <style>
            @media only screen and (max-width: 600px) {
              .container {
                width: 100% !important;
              }
            }
          </style>
      </head>
      <body style="margin:0; padding:0; background:#F2F8F9; font-family: "Helvetica", "Arial", sans-serif;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" style="padding:20px 0;">
                <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff; border-radius:8px; padding:30px; text-align:left;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="text-align:center; padding-bottom:20px;">
                      <h2 style="margin:0; color:#487E92;">HelpChain</h2>
                    </td>
                  </tr>

                  <!-- Main content -->
                  <tr>
                    <td style="color:#333;">
                      <p style="font-size:16px;">Hello,</p>
                      <p style="font-size:16px;">You requested a password reset. Click the button below to create a new password. If you didn’t request this, you can safely ignore this email. The reset link will expire in 15 minutes.</p>
                    </td>
                  </tr>

                  <!-- Reset link -->
                  <tr>
                    <td align="center" style="padding:20px 0;">
                      <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="background:#487E92; border-radius:4px;">
                            <a href="${resetUrl}" style="display:inline-block; padding:12px 24px; color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;">
                              Reset Password
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="color:#777; font-size:12px; text-align:center; padding-top:20px;">
                      If the button doesn’t work, copy and paste this link into your browser:  
                      <br />
                      <a href="${resetUrl}" style="color:#004aad;">${resetUrl}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
      </body>

      </html>
    `,
  });
}

export async function sendEmailVerificationUrl(
  to: string,
  emailVerificationUrl: string
) {
  await transporter.sendMail({
    from: `"HelpChain" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Confirm your email to continue your registration",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Confirm email</title>
          <style>
            @media only screen and (max-width: 600px) {
              .container {
                width: 100% !important;
              }
            }
          </style>
      </head>
      <body style="margin:0; padding:0; background:#F2F8F9; font-family: "Helvetica", "Arial", sans-serif;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" style="padding:20px 0;">
                <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff; border-radius:8px; padding:30px; text-align:left;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="text-align:center; padding-bottom:20px;">
                      <h2 style="margin:0; color:#487E92;">HelpChain</h2>
                    </td>
                  </tr>

                  <!-- Main content -->
                  <tr>
                    <td style="color:#333;">
                      <p style="font-size:16px;">Hello,</p>
                      <p style="font-size:16px;">Thank you for starting your registration with Help Chain.</p>
                      <p style="font-size:16px;">Please confirm your email address to continue building your profile and accessing opportunities.</p>
                    </td>
                  </tr>

                  <!-- Email confirmation link -->
                  <tr>
                    <td align="center" style="padding:20px 0;">
                      <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="background:#487E92; border-radius:4px;">
                            <a href="${emailVerificationUrl}" style="display:inline-block; padding:12px 24px; color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;">
                            Confirm Your Email
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="color:#777; font-size:12px; text-align:center; padding-top:20px;">
                      If you didn’t start this process, you can ignore this email.
                      <br />
                      – Help Chain Team 
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
      </body>

      </html>
    `,
  });
}

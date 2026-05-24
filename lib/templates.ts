type ContactEmailParams = {
  name: string;
  email: string;
  message: string;
};

export function getGoldenSpoonContactEmail({
  name,
  email,
  message,
}: ContactEmailParams) {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 10px;background:#0a0a0a;">
      <tr>
        <td align="center">

          <!-- MAIN CONTAINER -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:18px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.6);">

            <!-- HEADER -->
            <tr>
              <td style="padding:30px;text-align:center;background:linear-gradient(135deg,#f59e0b,#ef4444);">
                <h1 style="margin:0;color:#ffffff;font-size:28px;letter-spacing:1px;">
                  Golden Spoon 🍽️
                </h1>
                <p style="margin:6px 0 0;color:#fff;font-size:13px;opacity:0.9;">
                  Restaurant Management & Booking Platform
                </p>
              </td>
            </tr>

            <!-- TITLE -->
            <tr>
              <td style="padding:35px 30px;text-align:center;">
                <h2 style="margin:0;color:#ffffff;font-size:22px;">
                  New Reservation / Contact Request
                </h2>

                <p style="margin:12px 0 0;color:#a3a3a3;font-size:14px;line-height:1.6;">
                  You have received a new message from a customer through the Golden Spoon platform.
                </p>
              </td>
            </tr>

            <!-- DETAILS CARD -->
            <tr>
              <td style="padding:0 30px 30px;">

                <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:14px;padding:20px;">

                  <!-- NAME -->
                  <tr>
                    <td style="padding:8px 0;color:#fbbf24;font-size:12px;letter-spacing:1px;">
                      CUSTOMER NAME
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:12px;color:#ffffff;font-size:16px;font-weight:bold;">
                      ${name}
                    </td>
                  </tr>

                  <!-- EMAIL -->
                  <tr>
                    <td style="padding:8px 0;color:#fbbf24;font-size:12px;letter-spacing:1px;">
                      EMAIL ADDRESS
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:12px;color:#ffffff;font-size:15px;">
                      ${email}
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td style="padding:8px 0;color:#fbbf24;font-size:12px;letter-spacing:1px;">
                      MESSAGE
                    </td>
                  </tr>
                  <tr>
                    <td style="color:#e5e5e5;font-size:14px;line-height:1.7;background:#0f0f0f;padding:15px;border-radius:10px;">
                      ${message}
                    </td>
                  </tr>

                </table>

              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td align="center" style="padding:10px 30px 40px;">
                <a href="mailto:${email}"
                  style="display:inline-block;background:#f59e0b;color:#000000;text-decoration:none;padding:12px 26px;border-radius:10px;font-weight:bold;font-size:14px;">
                  Reply to Customer
                </a>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:20px;text-align:center;background:#0b0b0b;">
                <p style="margin:0;color:#6b7280;font-size:12px;">
                  © ${new Date().getFullYear()} Golden Spoon • All Rights Reserved
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
`;
}
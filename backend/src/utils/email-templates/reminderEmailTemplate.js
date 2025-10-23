const reminderEmailTemplate = (recipientName, capsuleTitle, openDate) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: Arial, sans-serif; background-color:#f4f7fa; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:white;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
      <tr>
        <td style="background-color:#0d47a1; padding:20px; text-align:center;">
          <h1 style="font-family:'Orbitron', sans-serif; font-size:28px; margin:0;">
            <a href="${process.env.FRONTEND_URL}" target="_blank" style="color:white; text-decoration:none;">
              Memora
            </a>
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding:30px; color:#333;">
          <h2 style="margin-bottom:10px;">Hi ${recipientName},</h2>
          <p>Just a little reminder — the time capsule <strong>${capsuleTitle}</strong> is set to open tomorrow (<strong>${openDate}</strong>).</p>
          <p>
            Get ready to revisit some beautiful memories with 
            <a href="${process.env.FRONTEND_URL}" target="_blank" style="color:#0d47a1; text-decoration:none; font-weight:bold;">
              Memora
            </a>.
          </p>
        </td>
      </tr>
      <tr>
        <td style="background-color:#f0f4f8; text-align:center; padding:15px; font-size:12px; color:#777;">
          © ${new Date().getFullYear()} Memora. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export default reminderEmailTemplate;

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail address
    pass: process.env.PASSWORD, // Your Gmail app password
  },
});

// Function to send email
const sendEmail = async (email, name, subject, message) => {
  try {
    const emailContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Sent</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .header {
      background: #ffe49c;
      color: white;
      padding: 15px;
      font-size: 20px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .content {
      font-size: 16px;
      color: #333;
      padding: 20px;
    }
    .footer {
      font-size: 14px;
      color: #777;
      padding: 10px;
      background: #f1f1f1;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Message Sent</div>
    <div class="content">
      <p>Dear <strong>${name}</strong>,</p>
      <p>Subject: <strong>${subject}</strong>.</p>
      <p>Your message: <strong>${message}</strong></p>
      <p>You will get a response shortly.</p>
    </div>
    <div class="footer">Thank you for your message!</div>
  </div>
</body>
</html>`;

    const mailOptions = {
      from: `"Sk Mehebub Ali" <${process.env.EMAIL}>`,
      to: email,
      subject: subject,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error.message);
    throw error;
  }
};

// Export the function as default
export default sendEmail;

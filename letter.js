const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Replace with your Resend API key
const RESEND_API_KEY = 're_Xx6MJGa2_KeSKwZfdjMfJkp9zjEoWv9Ls';

// Function to send an email
async function sendEmail({ to, subject, text, html, attachments }) {
  try {
    const formData = {
      from: 'CIA - Langley, Virginia <tennessee@ciagency.sbs>',
      to,
      subject,
      text,
      html,
    };

    // Add attachments if provided
    if (attachments && attachments.length > 0) {
      formData.attachments = attachments.map((attachment) => ({
        filename: path.basename(attachment),
        content: fs.readFileSync(attachment).toString('base64'),
      }));
    }

    const response = await axios.post(
      'https://api.resend.com/emails',
      formData,
      {
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error.message);
  }
}

// Usage example
sendEmail({
  to: ['dwight.lamb@yahoo.com', 'DwightLamb69@gmail.com'],
  subject: 'Hello from Resend!',
  text: 'This is a plain text email.',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
    <p>Dear <b> Dwight D. Lamb </b></p>

    <p>
        I hope this message finds you well. I am writing to formally notify you of the recent investigation by the cia into alleged fraudulent activities by the above mentioned indivudual
        <strong></strong>.
    </p>

    <p>
        This matter requires immediate attention due to 
        <strong>it confirmed reports from different individuals.</strong>.
    </p>

    <p>
        Please find attached a detailed PDF document containing all relevant information, including background details, 
        supporting evidence, and any preliminary findings to assist with your assessment and further action.
    </p>

    <p>
        If additional information is required or clarification is needed, please do not hesitate to contact me at 
        <a href="mailto:jameselmmore@gmail.com">jameselmmore@gmail.com</a>. 
        I am available to provide further details or discuss the matter at your earliest convenience.
    </p>

    <p>
        Thank you for your attention to this urgent matter. I look forward to your response and guidance on the next steps.
    </p>

    <p>
        Sincerely,<br>
        Agent James M. Elmore <br>
        Cyber Threat Analyst<br>
        The Central Intelligence Agency<br>
        Agent James M. Elmore
    </p>
</body>
</html>
`,
  attachments: ['./RE: CIA Investigation into Fraudulent Activities.pdf'], // Path to file(s)
});

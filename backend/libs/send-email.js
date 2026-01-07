import sgMail from '@sendgrid/mail';

// FIX: Use the correct environment variable name
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fromEmail = process.env.FROM_EMAIL;

export const sendEmail = async (to, subject, html) => {
  // FIX: Validate required fields
  if (!to || !subject || !html) {
    console.error("Missing required email parameters");
    return false;
  }

  const msg = {
    to,
    from: `Taskhub <${fromEmail}>`,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully to:", to);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    
    // Log more detailed error information
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }
    
    return false;
  }
};
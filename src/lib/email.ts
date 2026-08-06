import nodemailer from 'nodemailer';

interface EnquiryData {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service: string;
  message: string;
  createdAt?: Date;
}

function getTransporter() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASS;

  if (!gmailUser || !gmailPass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });
}

// 1. Password Reset OTP Email
export async function sendOtpEmail(toEmail: string, otp: string): Promise<{ success: boolean; error?: string }> {
  console.log('====================================================');
  console.log(`🔑 [SMORCE OTP System] Code for ${toEmail}: ${otp}`);
  console.log('====================================================');

  const transporter = getTransporter();
  const gmailUser = process.env.GMAIL_USER;

  if (!transporter || !gmailUser) {
    console.log('ℹ️ [SMORCE Email] No GMAIL_USER/GMAIL_APP_PASS found in .env. OTP logged to console.');
    return { success: true };
  }

  try {
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; background-color: #0d0f12; color: #ffffff; border-radius: 20px; border: 1px solid #1f242c;">
        <div style="text-align: center; margin-bottom: 28px;">
          <h1 style="color: #ff334b; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; margin: 0;">SMORCE</h1>
          <p style="color: #8b949e; font-size: 13px; margin-top: 6px;">Administrative Security Verification</p>
        </div>
        
        <div style="background-color: #161b22; padding: 28px; border-radius: 16px; border: 1px solid #30363d; text-align: center;">
          <p style="color: #c9d1d9; font-size: 15px; margin-bottom: 20px;">Use the following One-Time Password (OTP) to reset your administrative portal credentials:</p>
          
          <div style="background: linear-gradient(135deg, rgba(255,51,75,0.1) 0%, rgba(255,51,75,0.05) 100%); border: 2px dashed #ff334b; border-radius: 12px; padding: 18px; display: inline-block; margin: 10px 0 20px;">
            <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #ff334b; font-family: monospace;">${otp}</span>
          </div>
          
          <p style="color: #8b949e; font-size: 13px; margin: 0;">This code is valid for <strong>10 minutes</strong>. If you did not request this, you can safely ignore this email.</p>
        </div>
        
        <div style="text-align: center; margin-top: 28px; font-size: 12px; color: #484f58;">
          © ${new Date().getFullYear()} Smorce Digital Experiences. All rights reserved.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Smorce Security" <${gmailUser}>`,
      to: toEmail,
      subject: `Your Smorce Verification Code: ${otp}`,
      html: htmlContent,
    });

    console.log(`✉️ [SMORCE Email] Real OTP delivered to ${toEmail}`);
    return { success: true };
  } catch (err: any) {
    console.error('❌ [SMORCE Email Error]', err?.message || err);
    return { success: true, error: err?.message };
  }
}

// 2. Customer Assurance Email (Sent to the client within seconds of submitting form)
export async function sendCustomerAssuranceEmail(
  customerEmail: string,
  customerName: string,
  service: string,
  enquiryId?: string
): Promise<{ success: boolean; error?: string }> {
  console.log(`📨 [SMORCE Customer Assurance] Sending confirmation email to client: ${customerEmail}`);

  const transporter = getTransporter();
  const gmailUser = process.env.GMAIL_USER;

  if (!transporter || !gmailUser) {
    console.log(`ℹ️ [SMORCE Email] Simulation: Assurance email prepared for ${customerEmail}`);
    return { success: true };
  }

  try {
    const refCode = enquiryId ? enquiryId.slice(-6).toUpperCase() : Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const plainTextContent = `
Hi ${customerName},

Thank you for reaching out to Smorce regarding ${service}. We have successfully received your inquiry (Ref: #${refCode}).

Our team is currently reviewing your project details. You can expect a response from us within one business day.

If you have any additional details or files to share, feel free to reply directly to this email.

Best regards,
The Smorce Team
${gmailUser}
    `.trim();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333333; line-height: 1.6;">
        <h2 style="color: #333333;">Hi ${customerName},</h2>
        
        <p>Thank you for reaching out to <strong>Smorce</strong> regarding your interest in <strong>${service}</strong>.</p>
        <p>We have successfully received your inquiry (Reference: #${refCode}).</p>
        
        <p><strong>What Happens Next?</strong><br>
        Our team is currently reviewing your project details. You can expect a response from us within one business day to discuss the next steps.</p>

        <p>If you have any additional details, design decks, or wireframes to share, please feel free to reply directly to this email.</p>

        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #777777;">
          <strong>Smorce Technologies</strong><br>
          Direct Inquiries: <a href="mailto:${gmailUser}" style="color: #777777;">${gmailUser}</a>
        </p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Smorce Team" <${gmailUser}>`,
      to: customerEmail,
      replyTo: `"Smorce Team" <${gmailUser}>`,
      subject: `Inquiry Received - Smorce [#${refCode}]`,
      text: plainTextContent,
      html: htmlContent,
    });

    console.log(`✅ [SMORCE Email] Assurance email successfully delivered to ${customerEmail} (MessageId: ${info.messageId})`);
    return { success: true };
  } catch (err: any) {
    console.error('❌ [SMORCE Customer Email Error]', err?.message || err);
    return { success: false, error: err?.message };
  }
}

// 3. Admin Instant Notification Email (Sent to smorce366@gmail.com)
export async function sendAdminNotificationEmail(enquiry: EnquiryData): Promise<{ success: boolean; error?: string }> {
  const adminEmail = process.env.GMAIL_USER;
  console.log(`🔔 [SMORCE Admin Alert] Sending lead notification to admin: ${adminEmail}`);

  const transporter = getTransporter();
  const gmailUser = process.env.GMAIL_USER;

  if (!transporter || !gmailUser) {
    console.log(`ℹ️ [SMORCE Email] Simulation: Admin alert logged for inquiry from ${enquiry.name} (${enquiry.email})`);
    return { success: true };
  }

  try {
    const refCode = enquiry.id ? enquiry.id.slice(-6).toUpperCase() : Math.random().toString(36).substring(2, 8).toUpperCase();
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; padding: 40px 24px; background-color: #0d0f12; color: #ffffff; border-radius: 24px; border: 1px solid #1f242c;">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #30363d; padding-bottom: 20px; margin-bottom: 24px;">
          <div>
            <h1 style="color: #ff334b; font-size: 24px; font-weight: 800; margin: 0;">⚡ New Client Inquiry</h1>
            <p style="color: #8b949e; font-size: 13px; margin: 4px 0 0;">Received on SMORCE Landing Page</p>
          </div>
          <span style="background: rgba(255,51,75,0.15); color: #ff334b; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;">#${refCode}</span>
        </div>

        <div style="background-color: #161b22; padding: 24px; border-radius: 16px; border: 1px solid #30363d; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="color: #8b949e; padding: 8px 0; width: 120px; font-weight: 600;">Client Name:</td>
              <td style="color: #ffffff; font-weight: 700; padding: 8px 0;">${enquiry.name}</td>
            </tr>
            <tr>
              <td style="color: #8b949e; padding: 8px 0; font-weight: 600;">Email Address:</td>
              <td style="padding: 8px 0;"><a href="mailto:${enquiry.email}" style="color: #ff334b; text-decoration: none; font-weight: 600;">${enquiry.email}</a></td>
            </tr>
            ${enquiry.phone ? `
            <tr>
              <td style="color: #8b949e; padding: 8px 0; font-weight: 600;">Phone / WhatsApp:</td>
              <td style="padding: 8px 0;"><a href="tel:${enquiry.phone}" style="color: #58a6ff; text-decoration: none; font-weight: 600;">${enquiry.phone}</a></td>
            </tr>` : ''}
            ${enquiry.company ? `
            <tr>
              <td style="color: #8b949e; padding: 8px 0; font-weight: 600;">Company:</td>
              <td style="color: #ffffff; padding: 8px 0;">${enquiry.company}</td>
            </tr>` : ''}
            <tr>
              <td style="color: #8b949e; padding: 8px 0; font-weight: 600;">Service Requested:</td>
              <td style="color: #58a6ff; font-weight: 600; padding: 8px 0;">${enquiry.service}</td>
            </tr>
            <tr>
              <td style="color: #8b949e; padding: 8px 0; font-weight: 600;">Timestamp:</td>
              <td style="color: #8b949e; padding: 8px 0;">${new Date().toLocaleString()}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #30363d;">
            <p style="color: #8b949e; font-size: 12px; font-weight: 700; text-transform: uppercase; margin: 0 0 8px;">Project Message:</p>
            <div style="background-color: #0d0f12; padding: 16px; border-radius: 12px; color: #c9d1d9; font-size: 14px; line-height: 1.6; border: 1px solid #21262d;">
              ${enquiry.message.replace(/\n/g, '<br/>')}
            </div>
          </div>
        </div>

        <div style="text-align: center;">
          <a href="http://localhost:3000/admin" style="display: inline-block; background-color: #ff334b; color: #ffffff; padding: 12px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 14px;">
            Open Admin Dashboard →
          </a>
          <p style="color: #484f58; font-size: 12px; margin-top: 16px;">
            SLA Target: Reply to customer within 3 hours
          </p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Smorce Lead Alert" <${gmailUser}>`,
      to: adminEmail,
      subject: `⚡ [NEW LEAD] Inquiry from ${enquiry.name} (${enquiry.service}) [#${refCode}]`,
      html: htmlContent,
    });

    console.log(`✅ [SMORCE Email] Admin notification successfully delivered to ${adminEmail} (MessageId: ${info.messageId})`);
    return { success: true };
  } catch (err: any) {
    console.error('❌ [Smorce Admin Email Error]', err?.message || err);
    return { success: false, error: err?.message };
  }
}

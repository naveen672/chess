import nodemailer from 'nodemailer';

// Create transporter with the provided credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Gmail address from environment variable
    pass: process.env.GMAIL_APP_PASSWORD // App password from environment variable
  }
});

// Temporary storage for OTPs (in production, use Redis or database)
interface OTPData {
  email: string;
  otp: string;
  expiresAt: number;
}

const otpStorage = new Map<string, OTPData>();

// Generate 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email
export async function sendOTPEmail(email: string): Promise<{ success: boolean; message: string; otp?: string }> {
  try {
    // Check if environment variables are available
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing Gmail credentials in environment variables');
      return { 
        success: false, 
        message: 'Email service not configured properly' 
      };
    }

    console.log('Attempting to send email with user:', process.env.GMAIL_USER);
    
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Store OTP temporarily
    otpStorage.set(email, { email, otp, expiresAt });

    // Email content
    const mailOptions = {
      from: `Chess Champions <${process.env.GMAIL_USER}>`, // Chess Champions email from environment
      to: email,
      subject: 'Password Reset OTP - Chess Champions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: #1e3a8a; margin-bottom: 20px;">🏆 Chess Champions</h1>
            <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
            <p style="color: #666; font-size: 16px; margin-bottom: 30px;">
              You requested to reset your password. Use the OTP below to proceed:
            </p>
            <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h1 style="color: #1e3a8a; font-size: 32px; letter-spacing: 5px; margin: 0;">
                ${otp}
              </h1>
            </div>
            <p style="color: #888; font-size: 14px; margin-top: 20px;">
              This OTP will expire in 10 minutes for security reasons.
            </p>
            <p style="color: #888; font-size: 14px;">
              If you didn't request this password reset, please ignore this email.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    return { 
      success: true, 
      message: 'OTP sent successfully to your email',
      otp // For development/testing purposes - remove in production
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      message: 'Failed to send OTP email. Please try again.' 
    };
  }
}

// Verify OTP
export function verifyOTP(email: string, providedOTP: string): { success: boolean; message: string } {
  const otpData = otpStorage.get(email);
  
  if (!otpData) {
    return { success: false, message: 'OTP not found or expired. Please request a new one.' };
  }
  
  if (Date.now() > otpData.expiresAt) {
    otpStorage.delete(email);
    return { success: false, message: 'OTP has expired. Please request a new one.' };
  }
  
  if (otpData.otp !== providedOTP) {
    return { success: false, message: 'Invalid OTP. Please check and try again.' };
  }
  
  // OTP is valid - remove it from storage
  otpStorage.delete(email);
  return { success: true, message: 'OTP verified successfully.' };
}

// Clean up expired OTPs (call periodically)
export function cleanupExpiredOTPs() {
  const now = Date.now();
  Array.from(otpStorage.entries()).forEach(([email, otpData]) => {
    if (now > otpData.expiresAt) {
      otpStorage.delete(email);
    }
  });
}

// Start cleanup interval
setInterval(cleanupExpiredOTPs, 5 * 60 * 1000); // Clean up every 5 minutes
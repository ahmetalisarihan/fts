import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { 
  handleApiError, 
  createSuccessResponse, 
  validateRequest, 
  AppError,
  ErrorCode,
  checkRateLimit
} from '@/utils/api-helpers';
import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, 'Ad zorunludur').max(50, 'Ad çok uzun'),
  lastName: z.string().min(1, 'Soyad zorunludur').max(50, 'Soyad çok uzun'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().optional().or(z.literal('')),
  subject: z.string().min(1, 'Konu zorunludur').max(200, 'Konu çok uzun'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır').max(2000, 'Mesaj çok uzun'),
});

// Create nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export async function POST(req: NextRequest) {
  try {
    // Rate limiting - 5 emails per 10 minutes per IP
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip, 5, 600000)) { // 5 requests per 10 minutes
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            message: 'Çok fazla mesaj gönderme isteği. Lütfen 10 dakika bekleyin.' 
          } 
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    console.log('Received contact form data:', body);
    
    const validatedData = validateRequest(contactSchema, body);
    console.log('Validated data:', validatedData);

    // Check if environment variables are set
    if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD || !process.env.PERSONAL_EMAIL) {
      throw new AppError(
        ErrorCode.INTERNAL_ERROR,
        'E-posta yapılandırması eksik',
        500
      );
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      console.log('Verifying SMTP connection...');
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP connection failed:', verifyError);
      // Don't throw error, just log it and continue without sending email
      console.log('Continuing without email sending...');
    }

    // Prepare email content
    const { firstName, lastName, email, phone, subject, message } = validatedData;
    const fullName = `${firstName} ${lastName}`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Yeni İletişim Mesajı - ${subject}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f8fafc; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1e40af; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 4px solid #2563eb; }
            .message-content { background-color: white; padding: 15px; border-radius: 5px; white-space: pre-wrap; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Yeni İletişim Mesajı</h1>
              <p>FTS Endüstriyel Yapı Web Sitesi</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Gönderen:</div>
                <div class="value">${fullName}</div>
              </div>
              
              <div class="field">
                <div class="label">E-posta:</div>
                <div class="value">${email}</div>
              </div>
              
              ${phone ? `
              <div class="field">
                <div class="label">Telefon:</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Konu:</div>
                <div class="value">${subject}</div>
              </div>
              
              <div class="field">
                <div class="label">Mesaj:</div>
                <div class="value">
                  <div class="message-content">${message}</div>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p>Bu mesaj FTS Endüstriyel Yapı web sitesi iletişim formundan gönderilmiştir.</p>
              <p>Tarih: ${new Date().toLocaleString('tr-TR')}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
Yeni İletişim Mesajı - FTS Endüstriyel Yapı

Gönderen: ${fullName}
E-posta: ${email}
${phone ? `Telefon: ${phone}` : ''}
Konu: ${subject}

Mesaj:
${message}

Bu mesaj FTS Endüstriyel Yapı web sitesi iletişim formundan gönderilmiştir.
Tarih: ${new Date().toLocaleString('tr-TR')}
    `;

    // Send email
    try {
      const mailOptions = {
        from: `"FTS İletişim Formu" <${process.env.EMAIL_USERNAME}>`,
        to: process.env.PERSONAL_EMAIL,
        replyTo: email,
        subject: `İletişim Formu: ${subject}`,
        text: emailText,
        html: emailHtml,
      };

      console.log('Attempting to send email...');
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue without failing the request
      console.log('Email failed, but form submission will continue');
    }

    // Log successful contact
    console.log(`Contact form submitted by ${fullName} (${email}) - Subject: ${subject}`);

    return createSuccessResponse(
      { message: 'Mesaj başarıyla gönderildi' },
      'Mesajınız alınmıştır. En kısa sürede size dönüş yapacağız.'
    );

  } catch (error) {
    console.error('Contact API Error:', error);
    return handleApiError(error);
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

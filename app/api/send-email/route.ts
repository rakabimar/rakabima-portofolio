import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// POST /api/send-email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter using environment variables
    // You'll need to set these in your .env.local file
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from your portfolio contact form.
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #0a0a0a;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border-radius: 16px; overflow: hidden; border: 1px solid #dc603f33;">
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #dc603f 0%, #ff7f5c 100%); padding: 24px; text-align: center;">
        <h1 style="color: #000; margin: 0; font-size: 24px; font-weight: bold;">New Portfolio Message</h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 32px;">
        <div style="margin-bottom: 24px;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0 0 4px 0;">From</p>
          <p style="color: #f5f5f5; font-size: 16px; margin: 0; font-weight: 500;">${name}</p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0 0 4px 0;">Email</p>
          <a href="mailto:${email}" style="color: #dc603f; font-size: 16px; text-decoration: none;">${email}</a>
        </div>
        
        <div style="margin-bottom: 24px;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0 0 4px 0;">Subject</p>
          <p style="color: #f5f5f5; font-size: 16px; margin: 0; font-weight: 500;">${subject}</p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0 0 8px 0;">Message</p>
          <div style="background-color: #262626; border-radius: 8px; padding: 16px; border: 1px solid #404040;">
            <p style="color: #f5f5f5; font-size: 15px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        
        <!-- Reply Button -->
        <div style="text-align: center; margin-top: 32px;">
          <a href="mailto:${email}?subject=Re: ${subject}" 
             style="display: inline-block; background: linear-gradient(90deg, #dc603f 0%, #ff7f5c 100%); color: #000; font-weight: bold; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 14px;">
            Reply to ${name}
          </a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #0d0d0d; padding: 16px; text-align: center; border-top: 1px solid #262626;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          Sent from your portfolio contact form
        </p>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}

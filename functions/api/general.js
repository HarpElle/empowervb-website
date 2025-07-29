import { Resend } from 'resend';
import { getContactEmail } from '../../src/config/contact.js';

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // Parse form data
    const formData = await request.formData();
    const data = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      botcheck: formData.get('botcheck')
    };

    // Honeypot spam protection
    if (data.botcheck) {
      return new Response(JSON.stringify({ error: 'Spam detected' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate required fields
    if (!data.first_name || !data.last_name || !data.email || !data.subject || !data.message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize Resend
    const resend = new Resend(env.RESEND_API_KEY);

    // Format submission time in CST
    const now = new Date();
    const cstTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(now);

    // Create email content
    const emailContent = `
New General Inquiry Submission

Contact Information:
- First Name: ${data.first_name}
- Last Name: ${data.last_name}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}

Inquiry Details:
- Subject: ${data.subject}
- Message: ${data.message}

Submission Details:
- Submitted: ${cstTime}
- Form Type: General Inquiry

This submission was received through the Empower Volleyball Club website.
    `;

    // Send email
    await resend.emails.send({
      from: 'noreply@interest.empowervb.com',
      to: getContactEmail(),
      subject: `General Inquiry - ${data.first_name} ${data.last_name}`,
      text: emailContent,
      replyTo: data.email
    });

    // Redirect to thank you page
    return new Response(null, {
      status: 302,
      headers: {
        'Location': 'https://empowervb.com/thank-you-message'
      }
    });

  } catch (error) {
    console.error('Form submission error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 
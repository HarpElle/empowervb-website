import { Resend } from 'resend';
import { getContactEmail } from '../../src/config/contact.js';

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // Parse form data
    const formData = await request.formData();
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      experience: formData.get('experience'),
      certifications: formData.get('certifications'),
      availability: formData.get('availability'),
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
    if (!data.name || !data.email || !data.phone || !data.experience || !data.availability) {
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
New U15 Nationals Coaching Application Submission

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}

Coaching Background:
- Experience: ${data.experience}
- Certifications: ${data.certifications || 'None provided'}
- Availability: ${data.availability}

Submission Details:
- Submitted: ${cstTime}
- Form Type: U15 Nationals Coaching Application

This submission was received through the Empower Volleyball Club website.
    `;

    // Send email
    await resend.emails.send({
      from: 'noreply@interest.empowervb.com',
      to: getContactEmail(),
      subject: `U15 Nationals Coaching Application - ${data.name}`,
      text: emailContent,
      replyTo: data.email
    });

    // Redirect to thank you page
    return new Response(null, {
      status: 302,
      headers: {
        'Location': 'https://empowervb.com/thank-you-coaching'
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
import { Resend } from 'resend';
import { getContactEmail } from '../../src/config/contact.js';

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // Parse form data
    const formData = await request.formData();
    const data = {
      company_name: formData.get('company_name'),
      contact_name: formData.get('contact_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      interest_tier: formData.get('interest_tier'),
      budget_range: formData.get('budget_range'),
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
    if (!data.company_name || !data.contact_name || !data.email || !data.interest_tier) {
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
New Sponsorship Inquiry Submission

Company Information:
- Company Name: ${data.company_name}
- Contact Name: ${data.contact_name}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}

Sponsorship Details:
- Interest Tier: ${data.interest_tier}
- Budget Range: ${data.budget_range || 'Not specified'}
- Message: ${data.message || 'No additional message provided'}

Submission Details:
- Submitted: ${cstTime}
- Form Type: Sponsorship Inquiry

This submission was received through the Empower Volleyball Club website.
    `;

    // Send email
    await resend.emails.send({
      from: 'noreply@interest.empowervb.com',
      to: getContactEmail(),
      subject: `Sponsorship Inquiry - ${data.company_name}`,
      text: emailContent,
      replyTo: data.email
    });

    // Redirect to thank you page
    return new Response(null, {
      status: 302,
      headers: {
        'Location': 'https://empowervb.com/thank-you-sponsorship'
      }
    });

  } catch (error) {
    console.error('Sponsorship form submission error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 
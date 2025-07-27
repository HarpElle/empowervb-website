import { Resend } from 'resend';

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // Parse form data
    const formData = await request.formData();
    const data = {
      player_name: formData.get('player_name'),
      parent_name: formData.get('parent_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      age: formData.get('age'),
      positions: formData.getAll('positions'), // Get all selected positions
      experience: formData.get('experience'),
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
    if (!data.player_name || !data.parent_name || !data.email || !data.age || !data.positions.length) {
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
New U15 Tryout Interest Submission

Player Information:
- Player Name: ${data.player_name}
- Parent/Guardian Name: ${data.parent_name}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}
- Player Age (as of July 1, 2025): ${data.age} years old
- Position(s) Played: ${data.positions.join(', ')}
- Volleyball Experience: ${data.experience || 'Not provided'}

Submission Details:
- Submitted: ${cstTime}
- Form Type: Register Your Interest

This submission was received through the Empower Volleyball Club website.
    `;

    // Send email
    await resend.emails.send({
      from: 'noreply@interest.empowervb.com',
      to: 'info@empowervb.com',
      subject: `New U15 Tryout Interest - ${data.player_name}`,
      text: emailContent,
      replyTo: data.email
    });

    // Redirect to thank you page
    return new Response(null, {
      status: 302,
      headers: {
        'Location': 'https://empowervb.com/thank-you'
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
export async function onRequestPost(context) {
  try {
    // Get form data
    const formData = await context.request.formData();
    const email = formData.get('email');
    
    // Validate email
    if (!email || !email.includes('@')) {
      return new Response('Invalid email address', { status: 400 });
    }
    
    // Save to KV storage with timestamp
    const timestamp = new Date().toISOString();
    await context.env.EMAIL_SIGNUPS.put(email, JSON.stringify({
      email: email,
      timestamp: timestamp,
      ip: context.request.headers.get('CF-Connecting-IP'),
      userAgent: context.request.headers.get('User-Agent')
    }));
    
    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: "Thank you! We'll notify you when registration opens."
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Error saving email:', error);
    return new Response('Sorry, there was an error. Please try again.', { 
      status: 500 
    });
  }
}

// Handle OPTIONS requests for CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

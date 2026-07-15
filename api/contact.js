// POST /api/contact — Submit contact form
const { supabase, parseBody, json, handleCors } = require('./supabase');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    return json(res, { error: 'Method not allowed' }, 405);
  }

  try {
    const body = await parseBody(req);

    // Validation
    if (!body.name?.trim()) return json(res, { error: 'Name is required' }, 400);
    if (!body.email?.trim()) return json(res, { error: 'Email is required' }, 400);
    if (!body.message?.trim()) return json(res, { error: 'Message is required' }, 400);

    const { data, error } = await supabase.from('contacts').insert({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      track_interest: body.track_interest?.trim() || null,
      message: body.message.trim(),
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return json(res, { error: 'Database error' }, 500);
    }

    return json(res, { success: true, message: 'Message sent!' });
  } catch (err) {
    console.error('Contact API error:', err);
    return json(res, { error: 'Invalid request' }, 400);
  }
};

// POST /api/subscribe — Newsletter subscription
const { supabase, parseBody, json, handleCors } = require('./supabase');

module.exports = async (req, res) => {
  if (handleCors(req, res)) return;

  if (req.method !== 'POST') {
    return json(res, { error: 'Method not allowed' }, 405);
  }

  try {
    const body = await parseBody(req);

    if (!body.email?.trim()) return json(res, { error: 'Email is required' }, 400);

    const { data, error } = await supabase.from('subscribers').insert({
      email: body.email.trim().toLowerCase(),
      name: body.name?.trim() || null,
    });

    if (error) {
      if (error.code === '23505') {
        return json(res, { error: 'Already subscribed!' }, 409);
      }
      console.error('Supabase insert error:', error);
      return json(res, { error: 'Database error' }, 500);
    }

    return json(res, { success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    return json(res, { error: 'Invalid request' }, 400);
  }
};

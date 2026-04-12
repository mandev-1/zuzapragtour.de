// Netlify Function: health
exports.handler = async () => {
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ok: true, service: 'email-to-blog', timestamp: new Date().toISOString() }),
  };
};

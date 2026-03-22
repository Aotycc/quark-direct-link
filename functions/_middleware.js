// /home/user/quark-direct-link/functions/_middleware.js
export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Quark-Cookie',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const response = await context.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Quark-Cookie');
  return response;
}
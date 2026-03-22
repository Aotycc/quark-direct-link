// /home/user/quark-direct-link/functions/api/download.js
const QUARK_HEADERS = (cookie) => ({
  'Cookie': cookie,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Referer': 'https://pan.quark.cn/',
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
});

export async function onRequestPost(context) {
  const cookie = context.request.headers.get('X-Quark-Cookie') || '';

  if (!cookie) {
    return Response.json({ code: -1, message: '请提供Cookie' }, { status: 400 });
  }

  try {
    const body = await context.request.json();
    const fids = body.fids || [];

    if (fids.length === 0) {
      return Response.json({ code: -1, message: '请提供文件ID' }, { status: 400 });
    }

    const apiUrl = 'https://drive-pc.quark.cn/1/clouddrive/file/download?pr=ucpro&fr=pc';
    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers: QUARK_HEADERS(cookie),
      body: JSON.stringify({ fids }),
    });
    const data = await resp.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ code: -1, message: err.message }, { status: 500 });
  }
}
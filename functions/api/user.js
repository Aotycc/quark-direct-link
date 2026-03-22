// /home/user/quark-direct-link/functions/api/user.js
const QUARK_HEADERS = (cookie) => ({
  'Cookie': cookie,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Referer': 'https://pan.quark.cn/',
  'Accept': 'application/json, text/plain, */*',
});

export async function onRequestGet(context) {
  const cookie = context.request.headers.get('X-Quark-Cookie') || '';

  if (!cookie) {
    return Response.json({ code: -1, message: '请提供Cookie' }, { status: 400 });
  }

  try {
    const resp = await fetch(
      'https://pan.quark.cn/account/info?fr=pc&platform=pc',
      { headers: QUARK_HEADERS(cookie) }
    );
    const data = await resp.json();

    // Also get capacity info
    const capResp = await fetch(
      'https://drive-pc.quark.cn/1/clouddrive/capacity/info?pr=ucpro&fr=pc',
      { headers: QUARK_HEADERS(cookie) }
    );
    const capData = await capResp.json();

    return Response.json({
      code: 0,
      data: {
        user: data.data,
        capacity: capData.data,
      },
    });
  } catch (err) {
    return Response.json({ code: -1, message: err.message }, { status: 500 });
  }
}
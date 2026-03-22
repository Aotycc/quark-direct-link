// /home/user/quark-direct-link/functions/api/share/files.js
const QUARK_HEADERS = (cookie) => ({
  'Cookie': cookie,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Referer': 'https://pan.quark.cn/',
  'Accept': 'application/json, text/plain, */*',
});

export async function onRequestGet(context) {
  const cookie = context.request.headers.get('X-Quark-Cookie') || '';
  const url = new URL(context.request.url);
  const pwd_id = url.searchParams.get('pwd_id') || '';
  const stoken = url.searchParams.get('stoken') || '';
  const pdir_fid = url.searchParams.get('pdir_fid') || '0';
  const page = url.searchParams.get('page') || '1';
  const size = url.searchParams.get('size') || '50';

  if (!cookie || !pwd_id || !stoken) {
    return Response.json({ code: -1, message: '参数缺失' }, { status: 400 });
  }

  try {
    const apiUrl = new URL('https://drive-pc.quark.cn/1/clouddrive/share/sharepage/detail');
    apiUrl.searchParams.set('pr', 'ucpro');
    apiUrl.searchParams.set('fr', 'pc');
    apiUrl.searchParams.set('pwd_id', pwd_id);
    apiUrl.searchParams.set('stoken', stoken);
    apiUrl.searchParams.set('pdir_fid', pdir_fid);
    apiUrl.searchParams.set('force', '0');
    apiUrl.searchParams.set('_page', page);
    apiUrl.searchParams.set('_size', size);

    const resp = await fetch(apiUrl.toString(), {
      headers: QUARK_HEADERS(cookie),
    });
    const data = await resp.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ code: -1, message: err.message }, { status: 500 });
  }
}
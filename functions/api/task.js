// /home/user/quark-direct-link/functions/api/task.js
const QUARK_HEADERS = (cookie) => ({
  'Cookie': cookie,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Referer': 'https://pan.quark.cn/',
  'Accept': 'application/json, text/plain, */*',
});

export async function onRequestGet(context) {
  const cookie = context.request.headers.get('X-Quark-Cookie') || '';
  const url = new URL(context.request.url);
  const taskId = url.searchParams.get('task_id') || '';
  const retryIndex = url.searchParams.get('retry_index') || '0';

  if (!cookie || !taskId) {
    return Response.json({ code: -1, message: '参数缺失' }, { status: 400 });
  }

  try {
    const apiUrl = `https://drive-pc.quark.cn/1/clouddrive/task?pr=ucpro&fr=pc&task_id=${taskId}&retry_index=${retryIndex}`;
    const resp = await fetch(apiUrl, {
      headers: QUARK_HEADERS(cookie),
    });
    const data = await resp.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ code: -1, message: err.message }, { status: 500 });
  }
}
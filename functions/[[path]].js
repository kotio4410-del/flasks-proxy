const ORIGIN = "coupe-flacks.vercel.app";

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const target = new URL(url.pathname + url.search, ORIGIN);

  const headers = new Headers(request.headers);
  headers.set("Host", target.host);
  headers.set("X-Forwarded-Host", url.host);
  headers.set("X-Forwarded-Proto", url.protocol.replace(":", ""));

  return fetch(new Request(target, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  }));
}

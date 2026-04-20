export interface Env {
}

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Skip static assets
  if (pathname.includes("/assets/") ||
      pathname.endsWith(".css") || pathname.endsWith(".js") ||
      pathname.endsWith(".woff") || pathname.endsWith(".png") ||
      pathname.endsWith(".jpg") || pathname.endsWith(".svg") ||
      pathname.endsWith(".html")) {
    return context.next();
  }

  // Try adding .html extension
  const htmlUrl = new URL(pathname.replace(/\/+$/, "") + ".html", url.origin);
  const resp = await fetch(htmlUrl.href);
  if (resp.ok) {
    return new Response(resp.body, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }

  // SPA fallback to index.html
  return fetch(new URL("/index.html", url.origin).href);
};

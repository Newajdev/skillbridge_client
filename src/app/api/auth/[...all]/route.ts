
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

const API_URL = env.API_URL;

async function proxy(request: NextRequest, { params }: { params: Promise<{ all: string[] }> }) {
  const { all } = await params;
  const path = all.join("/");
  const url = `${API_URL}/auth/${path}${request.nextUrl.search}`;

  try {
    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("connection");

    const body = request.method !== "GET" && request.method !== "HEAD" ? await request.blob() : undefined;

    console.log(`Proxying ${request.method} to: ${url}`);

    const response = await fetch(url, {
      method: request.method,
      headers: headers,
      body: body,
      cache: "no-store",
      redirect: "manual"
    });

    const responseHeaders = new Headers(response.headers);

    const setCookies = responseHeaders.getSetCookie();

    if (setCookies && setCookies.length > 0) {
      responseHeaders.delete("set-cookie");

      setCookies.forEach((cookie) => {
        let newCookie = cookie.replace(/Domain=[^;]+;?\s*/gi, "");

        if (!newCookie.includes("Path=")) {
          newCookie += "; Path=/";
        }

        // Remove SameSite=Lax or Strict for cross-origin if needed, but SameSite=Lax is default
        // Usually, SameSite=None; Secure is required if cross-site, but since this is a proxy on the SAME domain as frontend, 
        // the browser sees it as first-party! So SameSite=Lax or Strict might perfectly work.
        // It's just Domain that messes up the cookie because Vercel frontend is NOT the backend domain.

        responseHeaders.append("set-cookie", newCookie);
      });
    }

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json({ error: "Proxy Error" }, { status: 500 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
export const PATCH = proxy;

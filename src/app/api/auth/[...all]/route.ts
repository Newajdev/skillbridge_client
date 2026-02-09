
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
    
    // THE FIX: Rewrite Set-Cookie to remove Domain attribute
    const setCookie = responseHeaders.get("set-cookie");
    
    if (setCookie) {
      console.log("Original Set-Cookie:", setCookie);
      // Remove Domain attribute. Regex matches "Domain=...;" or "Domain=..." at end.
      let newSetCookie = setCookie.replace(/Domain=[^;]+;?/gi, "");
      
      // Ensure Path is /
      if (!newSetCookie.includes("Path=")) {
        newSetCookie += "; Path=/";
      }

      console.log("New Set-Cookie:", newSetCookie);
      
      // We must delete the old one and set new.
      responseHeaders.delete("set-cookie");
      responseHeaders.set("set-cookie", newSetCookie);
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

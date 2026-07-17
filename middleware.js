import { createHmac, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";

const COOKIE_NAME = "backnd_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

const LANDING_HTML = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const DASHBOARD_HTML = readFileSync(new URL("./dashboard-view.html", import.meta.url), "utf8");

function getSecret() {
  return process.env.BACKND_SESSION_SECRET || process.env.BACKND_PASSWORD || "backnd-session-secret";
}

function getPassword() {
  return process.env.BACKND_PASSWORD || "";
}

function base64UrlEncode(input) {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payload) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function createSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = base64UrlEncode(JSON.stringify({ expiresAt }));
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function isValidSession(cookieHeader) {
  const cookie = cookieHeader
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));

  if (!cookie) return false;

  const token = cookie.slice(COOKIE_NAME.length + 1);
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = sign(payload);
  if (!safeEqual(signature, expectedSignature)) return false;

  try {
    const decoded = base64UrlDecode(payload);
    const session = JSON.parse(decoded);
    return Number(session.expiresAt) > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function redirectTo(url, status = 302) {
  return new Response(null, {
    status,
    headers: {
      Location: url.toString(),
      "Cache-Control": "no-store"
    }
  });
}

function setSessionCookie(response, token) {
  response.headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; Secure; SameSite=Lax`
  );
  return response;
}

function clearSessionCookie(response) {
  response.headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
  );
  return response;
}

function htmlResponse(body) {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  const isAuthenticated = isValidSession(request.headers.get("Cookie"));

  if (request.method !== "GET" && request.method !== "HEAD" && pathname !== "/login") {
    return new Response("Method not allowed", {
      status: 405,
      headers: {
        Allow: "GET, HEAD, POST",
        "Cache-Control": "no-store"
      }
    });
  }

  if (pathname === "/login" && request.method === "POST") {
    const formData = await request.formData();
    const password = String(formData.get("password") || "");
    const expectedPassword = getPassword();

    if (expectedPassword && password === expectedPassword) {
      const dashboardUrl = new URL("/dashboard.html", request.url);
      return setSessionCookie(redirectTo(dashboardUrl, 303), createSessionToken());
    }

    const landingUrl = new URL("/", request.url);
    landingUrl.searchParams.set("error", expectedPassword ? "1" : "config");
    return clearSessionCookie(redirectTo(landingUrl, 303));
  }

  if (pathname === "/login") {
    return redirectTo(new URL("/", request.url), 303);
  }

  if (pathname === "/logout") {
    return clearSessionCookie(redirectTo(new URL("/", request.url), 303));
  }

  if (pathname === "/" && isAuthenticated) {
    return redirectTo(new URL("/dashboard.html", request.url), 302);
  }

  if ((pathname === "/dashboard" || pathname === "/dashboard.html") && !isAuthenticated) {
    return redirectTo(new URL("/", request.url), 302);
  }

  if (pathname === "/dashboard") {
    return redirectTo(new URL("/dashboard.html", request.url), 302);
  }

  if (pathname === "/dashboard.html") {
    return htmlResponse(DASHBOARD_HTML);
  }

  if (pathname === "/dashboard-view.html") {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Cache-Control": "no-store"
      }
    });
  }

  return htmlResponse(LANDING_HTML);
}

export const config = {
  runtime: "nodejs",
  matcher: ["/", "/login", "/logout", "/dashboard", "/dashboard.html", "/dashboard-view.html"]
};

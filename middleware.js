import { next } from "@vercel/functions";

const COOKIE_NAME = "backnd_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

const encoder = new TextEncoder();

function getSecret() {
  return process.env.BACKND_SESSION_SECRET || process.env.BACKND_PASSWORD || "backnd-session-secret";
}

function getPassword() {
  return process.env.BACKND_PASSWORD || "";
}

function base64UrlEncode(input) {
  const bytes = input instanceof Uint8Array ? input : encoder.encode(input);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(value) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sign(payload) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return base64UrlEncode(new Uint8Array(signature));
}

async function createSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = base64UrlEncode(JSON.stringify({ expiresAt }));
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

async function isValidSession(cookieHeader) {
  const cookie = cookieHeader
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));

  if (!cookie) return false;

  const token = cookie.slice(COOKIE_NAME.length + 1);
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = await sign(payload);
  if (signature !== expectedSignature) return false;

  try {
    const decoded = new TextDecoder().decode(base64UrlDecode(payload));
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

export default async function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  const isAuthenticated = await isValidSession(request.headers.get("Cookie"));

  if (pathname === "/login" && request.method === "POST") {
    const formData = await request.formData();
    const password = String(formData.get("password") || "");
    const expectedPassword = getPassword();

    if (expectedPassword && password === expectedPassword) {
      const dashboardUrl = new URL("/dashboard.html", request.url);
      return setSessionCookie(redirectTo(dashboardUrl, 303), await createSessionToken());
    }

    const landingUrl = new URL("/", request.url);
    landingUrl.searchParams.set("error", expectedPassword ? "1" : "config");
    return clearSessionCookie(redirectTo(landingUrl, 303));
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

  return next();
}

export const config = {
  matcher: ["/", "/login", "/logout", "/dashboard", "/dashboard.html"]
};

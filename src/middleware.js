import { NextResponse, userAgent } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const publicRoutes = [
  "/Images",
  // "/login",
  "/mobile-not-supported",
  "/_next",
  "/api/login",
];

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const { device } = userAgent(request);
  // Check if the device is a mobile
  if (device.type === "mobile") {
    // Redirect to the custom mobile-not-supported page
    const mobileRedirectUrl = new URL("/mobile-not-supported", request.url);
    return NextResponse.redirect(mobileRedirectUrl);
  }

  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (publicRoutes.some((prefix) => pathname.startsWith(prefix))) {
      return NextResponse.next();
    }

    if (!session) {
      if (pathname === "/login") {
        return NextResponse.next();
      }
      return loginRedirect(request);
    }

    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    if (!payload) {
      return loginRedirect(request);
    }

    if (pathname === "/login") {
      return dashboardRedirect(request);
    }

    //Check expiry and delete session if expired
    if (payload.expiresAt < Date.now()) {
      await cookieStore.delete("session");
      return loginRedirect(request);
    }

    // Allow the request to proceed for authenticated users

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-userID", payload.id);
    requestHeaders.set("x-email", payload.email);

    return NextResponse.next({ headers: requestHeaders });
  } catch (error) {
    console.log(error);
    return loginRedirect(request);
  }
}

// Apply middleware to all routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

const loginRedirect = async (request) => {
  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
};

const dashboardRedirect = async (request) => {
  const dashboardUrl = new URL("/dashboard", request.url);
  return NextResponse.redirect(dashboardUrl);
};

const isValidSession = async (session) => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    if (payload.expiresAt < Date.now()) {
      await cookieStore.delete("session");
      return false;
    }
    return payload;
  } catch (error) {
    return false;
  }
};

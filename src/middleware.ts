import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.framely.site, demo.localhost:3000)
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  // Handle editor subdomain
  if (hostname === `editor.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/editor${path === "/" ? "" : path}`, req.url)
    );
  }

  // Handle root domain
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(new URL(`/dashboard${path}`, req.url));
  }

  // Handle custom subdomains
  const subdomain = hostname.split(".")[0];
  return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
});

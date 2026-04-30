import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // No more locale redirects needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|images|public|fonts|favicon.ico|icon.png|logo.svg|robots.txt|sitemap.xml|web-shot.png).*)",
  ],
};

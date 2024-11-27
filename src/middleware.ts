/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  
 if (pathname === "/account-opening/business-account") {
    return NextResponse.redirect(
      new URL("/account-opening/business-account/personal-info", request.url)
    );
  } else if (pathname === "/account-opening/personal-account") {
    return NextResponse.redirect(
      new URL("/account-opening/personal-account/personal-info", request.url)
    );
  } else if (pathname === "/self-service") {
    return NextResponse.redirect(new URL("/self-service/loan", request.url));
  }

  // return response;
}

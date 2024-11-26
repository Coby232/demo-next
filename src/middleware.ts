import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// import { v4 as uuidv4 } from "uuid";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // const uuid = uuidv4();

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else if (pathname === "/account-opening/business-account") {
    return NextResponse.redirect(
      new URL(
        "/account-opening/business-account/personal-info",
        request.url
      )
    );
  } else if (pathname === "/account-opening/personal-account") {
    return NextResponse.redirect(
      new URL(
        "/account-opening/personal-account/personal-info",
        request.url
      )
    );
  } 
  else if (pathname === "/self-service") {
    return NextResponse.redirect(
      new URL(
        "/self-service/loan",
        request.url
      )
    );
  }

  // const response = NextResponse.next();
  // if (!request.cookies.has("tracker_id")) {
  //   response.cookies.set("tracker_id", `${uuid}`);
  //   response.cookies.set({
  //     name: "tracker_id",
  //     value: `${uuid}`,
  //     path: "/",
  //   });
  // }

  // return response;
}


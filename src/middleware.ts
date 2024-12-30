import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth.service";

const AuthRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/login/?redirect_url=${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/admin/:path*", "/pricing", "/"],
};

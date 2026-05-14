import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Read cookie
  const token = request.cookies.get("jwt_authorization")?.value;

  // If no token and trying to access protected routes → redirect
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"], // Protect dashboard
};


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
 
// // This function can be marked `async` if using `await` inside
// export function proxy(request: NextRequest) {
//   const token = request.cookies.get("jwt_authorization")?.value;

//   // If no token and trying to access protected routes → redirect
//   if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/dashboard"], // Protect dashboard
// };
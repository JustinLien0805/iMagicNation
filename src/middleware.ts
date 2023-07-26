import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";
import { a } from "drizzle-orm/column.d-aa4e525d";

export default authMiddleware({
  publicRoutes: ["/signin"],
  async afterAuth(auth, req) {
    const url = new URL(req.nextUrl.origin);
    if (auth.isPublicRoute) {
      // If user is already authenticated, redirect them to the home page
      if (auth.userId) {
        return NextResponse.redirect(url);
      }
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  },
});

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();
//   if (url.pathname === "/") {
//     url.pathname = "/signin";
//     return NextResponse.redirect(url);
//   }
// }
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

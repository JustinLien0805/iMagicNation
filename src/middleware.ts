import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({
  publicRoutes: ["/signin", "/"],
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect("localhost:3000/signin");
    }

    NextResponse.next();
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

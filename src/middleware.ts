import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

// this checks if you are hitting an API
const isAPI = (path: string) => {
  return path.match(new RegExp(`^\/api\/`));
};

export default authMiddleware({
  publicRoutes: ["/signin"],
  async afterAuth(auth, req, event) {
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
    if (isAPI(req.nextUrl.pathname) && req.nextUrl.pathname !== "/blocked") {
      const ip = req.ip;
      const { success, pending, limit, reset, remaining } =
        await ratelimit.limit(`ratelimit_middleware_${ip}_${auth.userId}}`);
      console.log(remaining, " / ", limit);
      console.log("success", success);
      console.log(req.nextUrl.origin);
      event.waitUntil(pending);
      const res = success
        ? NextResponse.next()
        : NextResponse.redirect("http://localhost:3000/blocked");

      res.headers.set("X-RateLimit-Limit", limit.toString());
      res.headers.set("X-RateLimit-Remaining", remaining.toString());
      res.headers.set("X-RateLimit-Reset", reset.toString());
      return res;
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

import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(async function middleware() {}, {
  // Middleware still runs on all routes, but doesn't protect the blog route
  publicPaths: ["/", "/post", "/post/:path*"],
});

export const config = {
  matcher: ["/((?!_next).*)"],
};

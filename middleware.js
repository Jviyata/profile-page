export { auth as middleware } from "@/auth";
export const runtime = "nodejs";

export const config = {
  matcher: ["/add-profile", "/profiles/:path*/edit"],
};

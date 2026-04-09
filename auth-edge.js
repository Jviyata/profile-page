import NextAuth from "next-auth";

export const { auth } = NextAuth({
  providers: [],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth: authState, request: { nextUrl } }) {
      const isLoggedIn = !!(authState && authState.user);
      const path = nextUrl.pathname;
      const isProtectedRoute =
        path.startsWith("/add-profile") ||
        (path.startsWith("/profiles/") && path.endsWith("/edit"));

      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
});

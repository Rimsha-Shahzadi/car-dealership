import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// App Router NextAuth handler (equivalent of pages/api/auth/[...nextauth].js)
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

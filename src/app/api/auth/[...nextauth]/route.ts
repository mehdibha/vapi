import NextAuth from "next-auth";
import { authOptions } from "@/modules/auth/config";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

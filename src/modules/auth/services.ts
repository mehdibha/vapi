import { getServerSession } from "next-auth";
import { authOptions } from "./config";

export const getServerAuthSession = () => getServerSession(authOptions);

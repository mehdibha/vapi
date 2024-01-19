import { commentsRouter } from "@/modules/comments/api";
import { postRouter } from "@/modules/posts/api";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  comments: commentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

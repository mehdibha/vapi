import { commentRouter } from "@/modules/comments/api";
import { likeRouter } from "@/modules/likes/api";
import { postRouter } from "@/modules/posts/api";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  comment: commentRouter,
  like: likeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

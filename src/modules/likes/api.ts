import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const likeRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const likes = ctx.db.like.findMany({
      select: {
        post: {
          select: {
            id: true,
          },
        },
      },
      where: { authorId: ctx.session.user.id },
    });
    return likes;
  }),
  like: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.postId },
        select: { id: true },
      });
      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      const like = await ctx.db.like.findUnique({
        where: { likeId: { postId: input.postId, authorId: ctx.session.user.id } },
      });
      if (like)
        throw new TRPCError({ code: "BAD_REQUEST", message: "Like already exists" });
      return ctx.db.like.create({
        data: {
          post: { connect: { id: input.postId } },
          author: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  removeLike: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.postId },
        select: { id: true },
      });
      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      const like = await ctx.db.like.findUnique({
        where: { likeId: { postId: input.postId, authorId: ctx.session.user.id } },
      });
      if (!like) throw new TRPCError({ code: "NOT_FOUND", message: "Like not found" });
      return ctx.db.like.delete({
        where: { likeId: { postId: input.postId, authorId: ctx.session.user.id } },
      });
    }),
  getPostLikesCount: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.postId },
        select: { id: true, _count: { select: { likes: true } } },
      });

      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });

      return { count: post._count.likes };
    }),
});

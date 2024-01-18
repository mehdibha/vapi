import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        content: true,
        images: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        comments: {
          select: {
            id: true,
            message: true,
            author: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ content: z.string().min(1), images: z.array(z.string().url()) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          content: input.content,
          images: input.images,
          author: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  edit: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        content: z.string().min(1).optional(),
        images: z.array(z.string().url()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({ where: { id: input.postId } });
      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      if (post.authorId !== ctx.session.user.id)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to delete this post",
        });
      return ctx.db.post.update({
        where: { id: input.postId },
        data: {
          content: input.content,
          images: input.images,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({ where: { id: input.postId } });
      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      if (post.authorId !== ctx.session.user.id)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to delete this post",
        });
      return ctx.db.post.delete({
        where: { id: input.postId },
      });
    }),
});

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      // where: { published: true },

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
          include: {
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
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({ where: { id: input.id } });
      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      if (post.authorId !== ctx.session.user.id)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to delete this post",
        });
      return ctx.db.post.delete({
        where: { id: input.id },
      });
    }),
});

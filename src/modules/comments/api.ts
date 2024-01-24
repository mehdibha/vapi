import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const commentRouter = createTRPCRouter({
  add: protectedProcedure
    .input(z.object({ postId: z.string(), message: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.create({
        data: {
          message: input.message,
          author: { connect: { id: ctx.session.user.id } },
          post: { connect: { id: input.postId } },
        },
      });
    }),
  edit: protectedProcedure
    .input(z.object({ id: z.string(), message: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.comment.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      });
      if (!comment)
        throw new TRPCError({ code: "NOT_FOUND", message: "Comment not found" });
      if (comment.authorId !== ctx.session.user.id)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to delete this comment",
        });
      return ctx.db.comment.update({
        where: { id: input.id },
        data: { message: input.message },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.comment.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      });
      if (!comment)
        throw new TRPCError({ code: "NOT_FOUND", message: "Comment not found" });
      if (comment.authorId !== ctx.session.user.id)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to delete this comment",
        });
      return ctx.db.comment.delete({
        where: { id: input.id },
      });
    }),
});

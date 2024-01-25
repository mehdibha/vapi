import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  infinitePosts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // const { limit = 10, cursor, search } = input;
      const limit = input.limit ?? 10;
      const cursor = input.cursor;
      const posts = await ctx.db.post.findMany({
        ...(input.search && {
          where: {
            content: {
              contains: input.search,
              mode: "insensitive",
            },
          },
        }),
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          content: true,
          images: true,
          phone: true,
          city: true,
          createdAt: true,
          author: {
            select: {
              id: true,
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
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }
      return {
        posts,
        nextCursor,
      };
    }),
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        images: z.array(z.string().url()),
        phone: z
          .string()
          .length(8)
          .refine(
            (value) => {
              return ["2", "5", "4", "9", "3", "7"].some((char) =>
                value.startsWith(char)
              );
            },
            {
              message: "Not a valid phone number",
            }
          ),
        city: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.images.length === 0 && input.content === "") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Post cannot be empty" });
      }
      if (input.images.length > 5) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Post cannot have more than 5 images",
        });
      }
      // if (
      //   ctx.session.user.phone !== input.phone ||
      //   ctx.session.user.city !== input.city
      // ) {
      //   await ctx.db.user.update({
      //     where: { id: ctx.session.user.id },
      //     // @ts-expect-error TODO add validation to zod schema to fix this
      //     data: {
      //       ...(ctx.session.user.phone !== input.phone && { phone: input.phone }),
      //       ...(ctx.session.user.city !== input.city && { city: input.city }),
      //     },
      //   });
      // }
      return ctx.db.post.create({
        data: {
          content: input.content.replace(/\n+/g, "\n"),
          images: input.images,
          author: { connect: { id: ctx.session.user.id } },
          phone: input.phone,
          city: input.city,
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
          message: "You do not have permission to edit this post",
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

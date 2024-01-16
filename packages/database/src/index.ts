import { Prisma } from "@prisma/client";

const postWithCommentsAndAuthor = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    author: true,
    comments: {
      include: { author: true },
    },
  },
});

type PostWithCommentsAndAuthor = Prisma.PostGetPayload<typeof postWithCommentsAndAuthor>;

export * from "./client";
export type { PostWithCommentsAndAuthor };

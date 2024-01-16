import type { PostWithCommentsAndAuthor } from "@vapi/database";
import { prisma } from "@vapi/database";

export const getFeedPosts = async () => {
  const posts: PostWithCommentsAndAuthor[] = await prisma.post.findMany({
    // where: { published: true },
    include: {
      author: true,
      comments: {
        include: { author: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });
  return posts;
};

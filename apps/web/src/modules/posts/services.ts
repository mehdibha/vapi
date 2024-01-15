import { prisma } from "@vapotertn/database";

export const getFeedPosts = async () => {
  const posts = await prisma.post.findMany({
    where: { published: true },
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

// import { db } from "@/server/db";

// export const getFeedPosts = async () => {
//   const posts: PostWithCommentsAndAuthor[] = await db.post.findMany({
//     // where: { published: true },
//     include: {
//       author: true,
//       comments: {
//         include: { author: true },
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//     take: 20,
//   });
//   console.log("posts");
//   return posts;
// };

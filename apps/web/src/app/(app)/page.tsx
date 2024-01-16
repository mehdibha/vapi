import React from "react";
import { Feed } from "@/modules/posts/components/feed";
import { getFeedPosts } from "@/modules/posts/services";

export default async function Page() {
  const posts = await getFeedPosts();

  const feedPosts = posts.map((post) => ({
    postId: post.id,
    author: {
      name: post?.author?.name ?? null,
      avatar: post?.author?.image ?? null,
    },
    createdAt: post.createdAt,
    content: post.content,
    images: post.images,
    comments: post.comments.map((comment) => ({
      author: {
        name: comment?.author?.name ?? null,
        avatar: comment?.author?.image ?? null,
      },
      createdAt: comment.createdAt,
      message: comment.message,
    })),
    pending: false,
  }));

  return <Feed posts={feedPosts} />;
}

"use client";

import { api } from "@/trpc/react";
import { CreatePostCard } from "./create-post-card";
import { PostCard } from "./post-card";
import { SearchInput } from "./search-input";

export const Feed = () => {
  const { data: posts, isLoading } = api.post.getLatest.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!posts) return <div>Posts not found</div>;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 sm:px-8">
      <SearchInput
        placeholder="Rechercher sur vapi.tn"
        containerProps={{ className: "w-[500px] max-w-[100%] mx-auto" }}
      />
      <CreatePostCard />
      {posts.map((post, index) => {
        return (
            <PostCard
              key={index}
              postId={post.id}
              author={{
                name: post.author.name,
                avatar: post.author.image ?? undefined,
              }}
              createdAt={post.createdAt}
              content={post.content}
              images={post.images}
              comments={post.comments.map((comment) => ({
                message: comment.message,
                author: {
                  name: comment.author.name,
                  avatar: comment.author.image ?? undefined,
                },
              }))}
            />
        );
      })}
    </div>
  );
};

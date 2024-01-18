"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { CreatePostCard } from "./create-post-card";
import { PostCard } from "./post-card";
import { PostCardSkeleton } from "./post-card-skeleton";
import { SearchInput } from "./search-input";

export const Feed = () => {
  const [search, setSearch] = React.useState("");
  const { data: posts, isLoading } = api.post.getLatest.useQuery({ search });

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 sm:px-8">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher sur vapi.tn"
        containerProps={{ className: "w-[500px] max-w-[100%] mx-auto" }}
      />
      <CreatePostCard />
      {isLoading &&
        Array.from({ length: 10 }).map((_, index) => <PostCardSkeleton key={index} />)}
      {posts?.map((post, index) => {
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

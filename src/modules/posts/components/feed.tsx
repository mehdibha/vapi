"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import { api } from "@/trpc/react";
import { CreatePostCard } from "./create-post-card";
import { PostCard } from "./post-card";
import { PostCardSkeleton } from "./post-card-skeleton";
import { SearchInput } from "./search-input";

export const Feed = () => {
  const limit = 5;
  const [search, setSearch] = React.useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const { ref, entry } = useInView({
    threshold: 0,
  });
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    api.post.getLatest.useInfiniteQuery(
      {
        limit,
        search: search === "" ? search : debouncedSearch,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const lastPagePostsLength = React.useMemo(
    () => data?.pages[data.pages.length - 1]?.posts?.length,
    [data?.pages]
  );

  React.useEffect(() => {
    if (entry?.isIntersecting && lastPagePostsLength && lastPagePostsLength === limit) {
      void fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting, lastPagePostsLength]);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 sm:px-8">
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher sur vapi.tn"
        containerProps={{ className: "w-[500px] max-w-[100%] mx-auto" }}
      />
      <CreatePostCard />
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          ref={posts.length - 2 === index ? ref : undefined}
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
      ))}
      {(isLoading || isFetchingNextPage) &&
        Array.from({ length: 3 }).map((_, index) => <PostCardSkeleton key={index} />)}
    </div>
  );
};

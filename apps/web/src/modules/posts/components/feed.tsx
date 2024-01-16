"use client";

import React, { useOptimistic } from "react";
import { Avatar, AvatarFallback, AvatarImage, Card, CardHeader } from "@vapi/ui";
import { useSession } from "next-auth/react";
import { LoginModal } from "@/modules/auth/components/login-modal";
import { CreatePostModal } from "@/modules/posts/components/create-post-modal";
import { PostCard } from "@/modules/posts/components/post-card";
import { Post } from "@/types";

interface FeedProps {
  posts: Post[];
}

export const Feed = (props: FeedProps) => {
  const { posts } = props;

  const { data } = useSession();
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (currentState: Post[], newPost: Post) => [
      {
        postId: null,
        author: { name: data?.user.name ?? null, avatar: data?.user.image ?? null },
        content: newPost.content,
        images: newPost.images,
        createdAt: new Date(),
        comments: [],
        pending: true,
      },
      ...currentState,
    ]
  );

  return (
    <div className="container max-w-3xl space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={data?.user.image ?? undefined} alt="Image" />
              <AvatarFallback>{data?.user.name ? data?.user.name[0] : ""}</AvatarFallback>
            </Avatar>
            {data?.user ? (
              <CreatePostModal onPostAdd={addOptimisticPost}>
                <div className="bg-muted/50 hover:bg-muted text-muted-foreground w-full cursor-pointer rounded-full border px-6 py-2">
                  Vendez quelque chose ou posez une question.
                </div>
              </CreatePostModal>
            ) : (
              <LoginModal>
                <div className="bg-muted/50 hover:bg-muted text-muted-foreground w-full cursor-pointer rounded-full border px-6 py-2">
                  Vendez quelque chose ou posez une question.
                </div>
              </LoginModal>
            )}
          </div>
        </CardHeader>
      </Card>
      {optimisticPosts.map((post, index) => {
        if (!post.author?.name) {
          return null;
        }
        return <PostCard key={index} post={post} />;
      })}
    </div>
  );
};

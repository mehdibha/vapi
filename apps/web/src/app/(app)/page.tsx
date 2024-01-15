import React from "react";
import { Avatar, AvatarFallback, AvatarImage, Card, CardHeader } from "@vapotertn/ui";
import { LoginModal } from "@/modules/auth/components/login-modal";
import { getSession } from "@/modules/auth/services";
import { CreatePostModal } from "@/modules/posts/components/create-post-modal";
import { PostCard } from "@/modules/posts/components/post-card";
import { getFeedPosts } from "@/modules/posts/services";

export default async function Page() {
  const session = await getSession();
  const posts = await getFeedPosts();

  return (
    <div className="container max-w-3xl space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={session?.user.image} alt="Image" />
              <AvatarFallback>
                {session?.user.name ? session.user.name[0] : ""}
              </AvatarFallback>
            </Avatar>
            {session?.user ? (
              <CreatePostModal>
                <div className="bg-accent/70 hover:bg-accent border text-accent-foreground w-full cursor-pointer rounded-full px-6 py-2 text-lg">
                  Vendez quelque chose ou posez une question.
                </div>
              </CreatePostModal>
            ) : (
              <LoginModal>
                <div className="bg-accent/70 hover:bg-accent border text-accent-foreground w-full cursor-pointer rounded-full px-6 py-2 text-lg">
                  Vendez quelque chose ou posez une question.
                </div>
              </LoginModal>
            )}
          </div>
        </CardHeader>
      </Card>
      {posts.map((post) => {
        if (!post.author?.name || !post.author?.image) {
          return null;
        }
        return (
          <PostCard
            key={post.id}
            author={{ name: post.author?.name, avatar: post.author?.image }}
            content={post.content}
            images={post.images}
            createdAt={post.createdAt}
            comments={post.comments.map((comment) => ({
              content: comment.content,
              author: {
                name: comment.author?.name,
                avatar: comment.author?.image,
              },
              createdAt: comment.createdAt,
            }))}
          />
        );
      })}
    </div>
  );
}

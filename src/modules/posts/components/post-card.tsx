"use client";

import React, { type ForwardedRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatRelativeTime } from "@/utils/date";
import { CreateComment } from "@/modules/comments/components/create-comment";

interface PostCardProps {
  postId: string | null;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  content: string;
  images: string[];
  comments: {
    message: string;
    author: {
      name: string;
      avatar?: string;
    };
  }[];
}

export const PostCard = React.forwardRef(
  (props: PostCardProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { postId, author, createdAt, content, images, comments } = props;

    return (
      <Card ref={ref}>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={author.avatar} alt={`${author.name}'s profile picture`} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{author.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatRelativeTime(createdAt)}
              </p>
            </div>
          </div>
        </CardHeader>
        <div>
          <p className="p-6 pt-0">{content}</p>
          {images.length > 0 && (
            <div className="flex justify-center border-y">images here</div>
          )}
        </div>
        <div className="px-6">
          <Separator />
        </div>
        <div className="space-y-4 p-6">
          {comments.map((comment, index) => {
            return (
              <div key={index} className="flex space-x-4">
                <Avatar>
                  <AvatarImage
                    src={comment.author.avatar}
                    alt={`${comment.author.name}'s profile picture`}
                  />
                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="py-2 text-sm font-medium leading-none">
                    {comment.author.name}
                  </p>
                  <p>{comment.message}</p>
                </div>
              </div>
            );
          })}
          <CreateComment postId={postId} />
        </div>
      </Card>
    );
  }
);

PostCard.displayName = "PostCard";

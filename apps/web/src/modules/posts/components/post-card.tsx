"use client";

import React from "react";
import { useSession } from "next-auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardHeader,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Textarea,
} from "@vapotertn/ui";
import { formatRelativeTime } from "@vapotertn/utils";

interface PostCardProps {
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  content: string;
  images: string[];
  comments: {
    author: {
      name?: string | null;
      avatar?: string | null;
    } | null;
    createdAt: Date;
    content: string;
  }[];
}

export const PostCard = (props: PostCardProps) => {
  const { author, createdAt, content, images, comments } = props;

  const { data, status } = useSession();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={author.avatar} alt="Image" />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{author.name}</p>
            <p className="text-muted-foreground text-xs">
              {formatRelativeTime(createdAt)}
            </p>
          </div>
        </div>
      </CardHeader>
      <div>
        <p className="p-6 pt-0">{content}</p>
        {images.length > 0 && (
          <div className="flex justify-center border-y">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <img
                        src={image}
                        alt="vape"
                        className="h-[300px] w-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
      <div className="space-y-4 p-6">
        {comments.map((comment, index) => {
          if (!comment || !comment.author?.name) return null;

          return (
            <div key={index} className="flex space-x-4">
              <Avatar>
                <AvatarImage src={comment.author.avatar ?? undefined} alt="Image" />
                <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="py-2 text-sm font-medium leading-none">
                  {comment.author.name}
                </p>
                <p>{comment.content}</p>
              </div>
            </div>
          );
        })}
        {status === "authenticated" && (
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src={data.user.image ?? undefined} alt="Image" />
              <AvatarFallback>{data.user.name ? data.user.name[0] : ""}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <p className="py-2 text-sm font-medium leading-none">{data.user.name}</p>
              <Textarea placeholder="Ecrivez votre commentaire" className="mt-1 w-full" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

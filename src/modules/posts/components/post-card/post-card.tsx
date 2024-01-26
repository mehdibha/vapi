"use client";

import React, { type ForwardedRef } from "react";
import {
  Loader2 as SpinnerIcon,
  MoreVerticalIcon,
  Trash2Icon,
  MoreHorizontalIcon,
  MessageCircleIcon,
  MapPinIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/classes";
import { formatRelativeTime } from "@/utils/date";
import { shouldTruncate, truncate } from "@/utils/text";
import { cities } from "@/config/constants";
import { CreateComment } from "@/modules/comments/components/create-comment";
import { LikesCount } from "@/modules/likes/components/likes-count";
import { api } from "@/trpc/react";
import { PostCardInteractions } from "./post-card-interactions";

interface PostCardProps {
  postId: string | null;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  content: string;
  phone: string | null;
  city: string | null;
  images: string[];
  comments: {
    id: string;
    message: string;
    author: {
      id: string;
      name: string;
      avatar?: string;
    };
  }[];
  likesCount: number;
  commentsCount: number;
}

export const PostCard = React.forwardRef(
  (props: PostCardProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      postId,
      author,
      createdAt,
      content,
      phone,
      city,
      likesCount,
      commentsCount,
      images,
      comments,
    } = props;
    
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const { data } = useSession();
    const [isTruncated, setIsTruncated] = React.useState(true);
    const formattedCity = city
      ? cities.find((c) => c.value === city)?.label ?? null
      : null;

    const handleCommentClick = () => {
      if (!inputRef.current) return;
      inputRef.current.focus();
    };

    const utils = api.useUtils();
    const deletePost = api.post.delete.useMutation({
      onMutate: async () => {
        await utils.post.infinitePosts.cancel();
        utils.post.infinitePosts.setInfiniteData({ limit: 10, search: "" }, (data) => {
          if (!data) return data;

          return {
            ...data,
            pages: data.pages.map((page) => {
              return {
                ...page,
                posts: page.posts.filter((post) => post.id !== postId),
              };
            }),
          };
        });
      },
    });

    const deleteComment = api.comment.delete.useMutation({
      onMutate: async ({ id: commentId }) => {
        await utils.post.infinitePosts.cancel();
        utils.post.infinitePosts.setInfiniteData({ limit: 10, search: "" }, (data) => {
          if (!data) return data;

          return {
            ...data,
            pages: data.pages.map((page) => {
              return {
                ...page,
                posts: page.posts.map((post) => {
                  if (post.id === postId) {
                    return {
                      ...post,
                      comments: post.comments.filter(
                        (comment) => comment.id !== commentId
                      ),
                    };
                  }
                  return post;
                }),
              };
            }),
          };
        });
      },
    });

    return (
      <Card className="relative" ref={ref}>
        {data?.user.id === author.id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-7">
                <MoreHorizontalIcon size={16} />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer text-destructive hover:text-destructive"
                onClick={() => {
                  if (!postId) return;
                  deletePost.mutate({ postId });
                }}
              >
                {deletePost.isLoading ? (
                  <SpinnerIcon className="relative top-[1px] mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2Icon className="relative top-[1px] mr-2 h-4 w-4" />
                )}
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <CardHeader className="p-6  pb-0">
          <div className="flex items-start space-x-4">
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
        <div className="p-6 pt-4">
          {formattedCity && (
            <div className="mb-1 flex items-center space-x-1 text-muted-foreground">
              <MapPinIcon size={18} /> <span>{formattedCity}</span>
            </div>
          )}
          {/* TODO: make this shit better there are edge cases with multiple \n */}
          <p>{isTruncated ? truncate(content, 160) : content}</p>
          {shouldTruncate(content, 160) && (
            <Button
              variant="link"
              className="min-w-0 p-0"
              onClick={() => {
                setIsTruncated((prev) => !prev);
              }}
            >
              {isTruncated ? "Afficher plus" : "Afficher moins"}
            </Button>
          )}
        </div>
        {images.length > 0 && (
          <Carousel opts={{ loop: true }} className="h-[300px] w-full bg-muted">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    alt="vape"
                    loading="lazy"
                    className="h-[300px] w-full object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>
        )}
        <div
          className={cn("flex items-center justify-between p-4", {
            "justify-end": likesCount === 0 && commentsCount > 0,
          })}
        >
          <LikesCount postId={postId} />
          {commentsCount > 0 && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>{commentsCount}</span>
              <MessageCircleIcon className="h-4 w-4" />
            </div>
          )}
        </div>
        <Separator />
        <PostCardInteractions
          postId={postId}
          phone={phone}
          onCommentClick={handleCommentClick}
        />
        <Separator />
        <div className="space-y-4 p-6">
          {comments.map((comment, index) => {
            return (
              <div key={index} className="relative flex space-x-4">
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
                {data?.user.id === comment.author.id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 w-7"
                      >
                        <MoreVerticalIcon size={16} />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer text-destructive hover:text-destructive"
                        onClick={() => {
                          if (!postId) return;
                          deleteComment.mutate({ id: comment.id });
                        }}
                      >
                        {deleteComment.isLoading ? (
                          <SpinnerIcon className="relative top-[1px] mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2Icon className="relative top-[1px] mr-2 h-4 w-4" />
                        )}
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            );
          })}
          <CreateComment inputRef={inputRef} postId={postId} />
        </div>
      </Card>
    );
  }
);

PostCard.displayName = "PostCard";

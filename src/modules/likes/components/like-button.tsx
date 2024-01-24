import React from "react";
import { ThumbsUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/classes";
import { api } from "@/trpc/react";

interface LikeButtonProps {
  postId: string | null;
}

export const LikeButton = (props: LikeButtonProps) => {
  const { postId } = props;

  const utils = api.useUtils();
  const likes = api.like.all.useQuery();
  const liked = likes.data?.some((like) => like.post.id === postId);

  const like = api.like.like.useMutation({
    onMutate: async (post) => {
      utils.like.all.setData(undefined, (oldLikes) => {
        if (!oldLikes) return oldLikes;
        return [...oldLikes, { post: { id: post.postId } }];
      });
      utils.like.getPostLikesCount.setData({ postId: post.postId }, (oldCount) => {
        if (!oldCount) return oldCount;
        return { count: oldCount.count + 1 };
      });
    },
  });

  const removeLike = api.like.removeLike.useMutation({
    onMutate: async (post) => {
      utils.like.all.setData(undefined, (oldLikes) => {
        if (!oldLikes) return oldLikes;
        return oldLikes.filter((like) => like.post.id !== post.postId);
      });
      utils.like.getPostLikesCount.setData({ postId: post.postId }, (oldCount) => {
        if (!oldCount) return oldCount;
        return { count: oldCount.count - 1 };
      });
    },
  });

  const handleLikeClick = () => {
    if (!postId) return;
    if (liked) {
      removeLike.mutate({ postId });
    } else {
      like.mutate({ postId });
    }
  };

  return (
    <Button
      variant="ghost"
      disabled={!likes.isFetched || !postId}
      onClick={handleLikeClick}
    >
      <ThumbsUpIcon className={cn("mr-2.5 h-6 w-6", { "fill-foreground": liked })} />
      <span className="hidden xs:block">J&apos;aime</span>
    </Button>
  );
};

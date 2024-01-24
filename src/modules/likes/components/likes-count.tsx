import React from "react";
import { ThumbsUpIcon } from "lucide-react";
import { api } from "@/trpc/react";

interface LikesCountProps {
  postId: string | null;
}

export const LikesCount = (props: LikesCountProps) => {
  const { postId } = props;

  if (!postId) return null;

  const likes = api.like.getPostLikesCount.useQuery({ postId }, { enabled: !!postId });

  const likesCount = likes.data?.count;

  if (!likes.isSuccess || !likesCount || likesCount === 0) return null;

  return (
    <div className="flex items-center space-x-2 text-muted-foreground">
      <ThumbsUpIcon className="h-4 w-4" />
      <span className="text-muted-foreground">
        {likesCount > 1 ? `${likesCount} personnes aiment ça` : "1"}
      </span>
    </div>
  );
};

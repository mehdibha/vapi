import React from "react";
import { CopyIcon, MessageCircleIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/classes";
import { LikeButton } from "@/modules/likes/components/like-button";

interface PostCardInteractionsProps {
  postId: string | null;
  phone: string | null;
  onCommentClick: () => void;
}

export const PostCardInteractions = (props: PostCardInteractionsProps) => {
  const { postId, phone, onCommentClick } = props;

  const [showTel, setShowTel] = React.useState(false);

  const handleClickTel = () => {
    setShowTel(true);
  };

  return (
    <div
      className={cn("grid grid-cols-3 p-2", {
        "grid-cols-2": !phone,
      })}
    >
      <LikeButton postId={postId} />
      <Button variant="ghost" onClick={onCommentClick}>
        <MessageCircleIcon className="mr-2.5 h-6 w-6" />
        <span className="hidden xs:block">Commenter</span>
      </Button>
      {phone &&
        (showTel ? (
          <div className="flex items-center justify-center animate-in fade-in">
            <Button variant="ghost" onClick={handleClickTel}>
              <PhoneIcon className="mr-2.5 h-6 w-6 pt-1" />
              <span className="hidden xs:block">{phone}</span>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-11 w-11 flex-col items-center justify-center"
            >
              <CopyIcon size={15} className="pt-0.5" />
              <span className="text-[10px] font-extralight">Copier</span>
            </Button>
          </div>
        ) : (
          <Button variant="ghost" onClick={handleClickTel}>
            <PhoneIcon className="mr-2.5 h-6 w-6" />
            <span className="hidden xs:block">Appeler</span>
          </Button>
        ))}
    </div>
  );
};

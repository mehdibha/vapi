import { Input } from "@/components/ui/input";
import { CreatePostCard } from "./create-post-card";
import { PostCard } from "./post-card";

export const Feed = () => {
  return (
    <div className="container max-w-3xl space-y-4">
      <Input placeholder="Rechercher sur vapi.tn" />
      <CreatePostCard />
      {Array.from({ length: 5 }).map((_, index) => {
        return <PostCard key={index} />;
      })}
    </div>
  );
};

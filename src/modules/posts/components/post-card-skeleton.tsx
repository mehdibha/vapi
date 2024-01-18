import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PostCardSkeleton = () => {
  return (
    <Card>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[140px]" />
            <Skeleton className="h-3 w-[120px]" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-3 w-[95%]" />
          <Skeleton className="h-3 w-[80%]" />
        </div>
      </div>
      {/* Images */}
      <Skeleton className="h-[300px] w-full" />
      {/* Comments */}
      <div className="space-y-4 p-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div className="flex items-center space-x-4" key={index}>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-[140px]" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

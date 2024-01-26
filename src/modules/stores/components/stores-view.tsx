"use client";

import React from "react";
import { PlusIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/classes";
import { StoreCard } from "./store-card";

type StoreViewProps = React.HTMLAttributes<HTMLElement>;

export const StoresView = (props: StoreViewProps) => {
  const { className, ...restProps } = props;
  const limit = 10;
  const [search, setSearch] = React.useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  // const { ref, entry } = useInView({
  //   threshold: 0,
  // });
  // // we fetch likes from here to avoid like button glitching
  // api.like.all.useQuery();
  // const { data, isLoading, fetchNextPage, isFetchingNextPage } =
  //   api.post.infinitePosts.useInfiniteQuery(
  //     {
  //       limit,
  //       search: search === "" ? search : debouncedSearch,
  //     },
  //     {
  //       getNextPageParam: (lastPage) => lastPage.nextCursor,
  //     }
  //   );

  // const lastPagePostsLength = React.useMemo(
  //   () => data?.pages[data.pages.length - 1]?.posts?.length,
  //   [data?.pages]
  // );

  // React.useEffect(() => {
  //   if (entry?.isIntersecting && lastPagePostsLength && lastPagePostsLength === limit) {
  //     void fetchNextPage();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [entry?.isIntersecting, lastPagePostsLength]);

  // const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div
      className={cn("mx-auto w-full max-w-5xl space-y-8 px-4 sm:px-8", className)}
      {...restProps}
    >
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Recherche"
        containerProps={{ className: "w-[500px] max-w-[100%] mx-auto" }}
      />

      <div>
        <Button>
          <PlusIcon className="mr-1" />
          <span>Ajouter votre store</span>
        </Button>
        <div className="grid grid-cols-4 gap-6 mt-6">
          {[
            {
              name: "moustache",
              city: "tunis",
              image:
                "https://lh5.googleusercontent.com/p/AF1QipPhDA1V7d-NwHSa7U73SNNcldDLEa2w5iEXrtCf=w143-h143-n-k-no",
              description: "description",
              rating: 5,
            },
            {
              name: "moustache",
              city: "tunis",
              image:
                "https://lh5.googleusercontent.com/p/AF1QipPhDA1V7d-NwHSa7U73SNNcldDLEa2w5iEXrtCf=w143-h143-n-k-no",
              description: "description",
              rating: 5,
            },
          ].map((store, index) => (
            <StoreCard
              key={index}
              name={store.name}
              city={store.city}
              image={store.image}
              description={store.description}
              rating={store.rating}
              isOpen={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

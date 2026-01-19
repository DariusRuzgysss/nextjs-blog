import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import UserPostClient from "@/components/general/UserPostClient";
import { Params } from "@/types";
import { getPostById } from "@/lib/api/posts";
import { QUERY_KEYS } from "@/lib/constants";
import { getQueryClient } from "@/lib/utils";

const PostRoute = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.USER_POST, id],
    queryFn: () => getPostById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserPostClient id={id} />
    </HydrationBoundary>
  );
};

export default PostRoute;

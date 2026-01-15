import { Params } from "@/app/types";
import { getPostById } from "@/features/post/actions";
import { getQueryClient } from "@/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import UserPostClient from "@/components/general/UserPostClient";
import { QUERY_KEYS } from "@/utils/constants";

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

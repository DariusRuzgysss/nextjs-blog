"use client";
import { deletePost } from "@/features/post/actions";
import { CustomDialog } from "./Dialog";
import { Post } from "@/app/types";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

type Props = {
  post: Post;
};

const DeletePostClient = ({ post }: Props) => {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const deletePostMutation = useQueryMutate<null, Post, void>(
    deletePost,
    undefined,
    [],
    () => router.push("/dashboard"),
    "Successfully deleted"
  );
  return (
    <CustomDialog
      title={`Are you sure want to delete "${post.title}" ?`}
      description="Couldn't be recovered after deletion"
      onConfirm={() => {
        if (user) {
          deletePostMutation.mutateAsync({ id: null, data: post });
        }
      }}
    />
  );
};

export default DeletePostClient;

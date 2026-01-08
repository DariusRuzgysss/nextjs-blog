"use client";
import { Post } from "@/app/types";
import { deleteComment } from "@/features/post/actions";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { CustomDialog } from "./Dialog";

type Props = {
  commentId: string;
  post: Post;
};

const ManagePostComment = ({ commentId, post }: Props) => {
  const { user } = useKindeBrowserClient();
  const deleteCommentMutation = useQueryMutate<string, string, void>(
    undefined,
    deleteComment,
    [],
    () => {},
    "Successfully deleted"
  );
  return (
    <CustomDialog
      title={"Are you sure want to delete ?"}
      description="Couldn't be recovered after deletion"
      onConfirm={() => {
        if (user) {
          deleteCommentMutation.mutateAsync({ id: commentId, data: post.id });
        }
      }}
    />
  );
};

export default ManagePostComment;

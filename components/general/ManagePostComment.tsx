"use client";
import { Post } from "@/app/types";
import { deleteComment } from "@/features/post/actions";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { CustomDialog } from "./Dialog";
import { Icon } from "@iconify/react";
import Link from "next/link";

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
    <div className="flex flex-row lg:gap-4 gap-3 items-start justify-center">
      {/* <Link href={""}>
        <Icon
          icon="material-symbols:edit-rounded"
          fontSize={24}
          className="cursor-pointer"
        />
      </Link> */}
      <CustomDialog
        title={"Are you sure want to delete ?"}
        description="Couldn't be recovered after deletion"
        onConfirm={() => {
          if (user) {
            deleteCommentMutation.mutateAsync({ id: commentId, data: post.id });
          }
        }}
      />
    </div>
  );
};

export default ManagePostComment;

"use client";
import { Post } from "@/app/types";
import { deleteComment } from "@/features/post/actions";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { CustomDialog } from "./Dialog";
import { useTranslations } from "next-intl";

type Props = {
  commentId: string;
  post: Post;
};

const ManagePostComment = ({ commentId, post }: Props) => {
  const t = useTranslations();
  const { user } = useKindeBrowserClient();

  const deleteCommentMutation = useQueryMutate<string, string, void>(
    undefined,
    deleteComment,
    [],
    undefined,
    t("Toasts.commentDeleted")
  );

  return (
    <div className="flex flex-row lg:gap-4 gap-3 items-start justify-center">
      <CustomDialog
        title="General.confirmDelete"
        description="General.couldNotBeRecovered"
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

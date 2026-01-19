"use client";
import { deletePost } from "@/features/post/actions";
import { CustomDialog } from "./Dialog";
import { Post } from "@/types";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
  post: Post;
};

const DeletePostClient = ({ post }: Props) => {
  const t = useTranslations();
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const deletePostMutation = useQueryMutate<null, Post, void>(
    deletePost,
    undefined,
    [],
    () => router.push("/dashboard"),
    t("Toasts.recipeDeleted"),
  );
  return (
    <CustomDialog
      title="General.confirmDelete"
      description="General.couldNotBeRecovered"
      onConfirm={() => {
        if (user) {
          deletePostMutation.mutateAsync({ id: null, data: post });
        }
      }}
    />
  );
};

export default DeletePostClient;

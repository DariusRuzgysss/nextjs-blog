"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "./InputField";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { createComment } from "@/features/post/actions";
import { useTranslations } from "next-intl";

type FormValues = {
  comment: string;
};

const CommentsField = ({ postId }: { postId: string }) => {
  const t = useTranslations();
  const methods = useForm<FormValues>({
    defaultValues: {
      comment: "",
    },
  });

  const isSubmitting = methods.formState.isSubmitting;

  const createCommentMutation = useQueryMutate<string, string, void>(
    undefined,
    createComment,
    [],
    undefined,
    t("Toasts.commentAdded")
  );

  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    await createCommentMutation.mutateAsync({ id: postId, data: data.comment });
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitHandler)}
        className="flex flex-col gap-2 w-full"
      >
        <InputField
          inputType="textarea"
          name="comment"
          placeholder={t("PostPage.leaveComment")}
          label={t("PostPage.addComment")}
        />

        <Button type="submit" disabled={isSubmitting} className="self-end">
          {isSubmitting ? t("PostPage.posting") : t("PostPage.postComment")}
        </Button>
      </form>
    </FormProvider>
  );
};

export default CommentsField;

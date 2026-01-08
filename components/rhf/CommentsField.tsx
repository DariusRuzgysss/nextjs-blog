"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "./InputField";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { createComment } from "@/features/post/actions";

type CommentFormValues = {
  comment: string;
};

const CommentsField = ({ postId }: { postId: string }) => {
  const methods = useForm<CommentFormValues>({
    defaultValues: {
      comment: "",
    },
  });

  const isSubmitting = methods.formState.isSubmitting;

  const createCommentMutation = useQueryMutate<string, string, void>(
    undefined,
    createComment,
    [],
    () => {},
    "Successfully commented"
  );

  const submitHandler: SubmitHandler<CommentFormValues> = async (data) => {
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
          placeholder="Write your comment..."
          label="Add a comment"
        />

        <Button type="submit" disabled={isSubmitting} className="self-end">
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default CommentsField;

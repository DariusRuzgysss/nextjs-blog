"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import FormField from "./FormField";
import { Post } from "@/app/types";
import { ImageField } from "./ImageField";
import { deleteImage, uploadImage } from "@/features/cloudinary/actions";
import { updatePost, createPost } from "@/features/post/actions";
import Image from "next/image";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { useRouter } from "next/navigation";
import { useProgress } from "@/providers/ProgressProvider";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string(),
  category: z.string(),
  ingredients: z
    .array(z.string().min(1))
    .min(1, "At least one ingredient is required"),
  imageFile: z
    .instanceof(File)
    .refine((f) => f.size > 0, "Image file is required")
    .optional(),
});

export type PostFormData = z.infer<typeof postSchema>;

const PostForm = ({
  post,
}: {
  post?: Pick<
    Post,
    "id" | "title" | "content" | "imageUrl" | "category" | "ingredients"
  >;
}) => {
  const router = useRouter();
  const progress = useProgress();

  const methods = useForm<PostFormData>({
    defaultValues: {
      title: post?.title,
      content: post?.content,
      category: post?.category,
      ingredients: post?.ingredients,
      imageUrl: post?.imageUrl || "",
      imageFile: undefined,
    },
    resolver: zodResolver(postSchema),
    mode: "onChange",
  });

  const isSubmitting = methods.formState.isSubmitting;
  const imageUrl = useWatch({ control: methods.control, name: "imageUrl" });
  const imageFile = useWatch({ control: methods.control, name: "imageFile" });

  const updatePostMutation = useQueryMutate<string, PostFormData, void>(
    undefined,
    updatePost,
    [],
    () => router.push(`/post/${post?.id}`),
    "Successfully updated"
  );

  const createPostMutation = useQueryMutate<null, PostFormData, void>(
    createPost,
    undefined,
    [],
    () => router.push("/dashboard"),
    "Successfully created"
  );

  const onSubmit = async (data: PostFormData) => {
    progress.start();
    const dataCopy = { ...data };
    if (dataCopy.imageUrl && dataCopy.imageFile) {
      await deleteImage(dataCopy.imageUrl);
    }
    progress.set(40);
    if (!dataCopy.imageUrl && !dataCopy.imageFile && post?.imageUrl) {
      await deleteImage(post.imageUrl);
    }
    progress.set(60);
    if (dataCopy.imageFile) {
      const res = await uploadImage(dataCopy.imageFile);
      if (res.success && res.result?.secure_url) {
        dataCopy.imageUrl = res.result.secure_url;
      }
      delete dataCopy.imageFile;
    }
    progress.set(80);
    if (post) {
      await updatePostMutation.mutateAsync({ id: post.id, data: dataCopy });
    } else {
      await createPostMutation.mutateAsync({ id: null, data: dataCopy });
    }
    progress.finish();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <FormField
            inputType="input"
            type="text"
            name="title"
            label="Recipe Title *"
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            inputType="textarea"
            name="content"
            label="Instructions *"
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <ImageField name="imageFile" label="Choose image" />

          {imageUrl && !imageFile && (
            <Image
              src={imageUrl}
              alt="Preview"
              width={450}
              height={300}
              className="object-contain"
            />
          )}
        </div>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting
            ? `${post ? "Editing" : "Creating"} Post`
            : `${post ? "Edit" : "Create"} Post`}
        </Button>
      </form>
    </FormProvider>
  );
};

export default PostForm;

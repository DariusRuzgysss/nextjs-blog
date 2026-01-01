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
import { Icon } from "@iconify/react";
import { useQueryMutate } from "@/hooks/api/useMutate";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string(),
  imageFile: z
    .instanceof(File)
    .refine((f) => f.size > 0, "Image file is required")
    .refine((f) => f.size <= 5_000_000, "Max file size is 5MB")
    .optional(),
});

export type PostFormData = z.infer<typeof postSchema>;

const PostForm = ({
  post,
}: {
  post?: Pick<Post, "id" | "title" | "content" | "imageUrl">;
}) => {
  const methods = useForm<PostFormData>({
    defaultValues: {
      title: post?.title,
      content: post?.content,
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
    updatePost
  );

  const createPostMutation = useQueryMutate<null, PostFormData, void>(
    createPost
  );

  const onSubmit = async (data: PostFormData) => {
    const dataCopy = { ...data };
    if (dataCopy.imageUrl && dataCopy.imageFile) {
      await deleteImage(dataCopy.imageUrl);
    }
    if (!dataCopy.imageUrl && !dataCopy.imageFile && post?.imageUrl) {
      await deleteImage(post.imageUrl);
    }
    if (dataCopy.imageFile) {
      const res = await uploadImage(dataCopy.imageFile);
      if (res.success && res.result?.secure_url) {
        dataCopy.imageUrl = res.result.secure_url;
      }
      delete dataCopy.imageFile;
    }
    if (post) {
      updatePostMutation.mutateAsync({ id: post.id, data: dataCopy });
    } else {
      createPostMutation.mutateAsync({ id: null, data: dataCopy });
    }
  };

  const clearImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    methods.setValue("imageFile", undefined);
    methods.setValue("imageUrl", "");
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
            label="Title"
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            inputType="textarea"
            name="content"
            label="Content"
            placeholder="Content"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row  justify-between">
            <ImageField name="imageFile" label="Choose image" />
            {imageUrl || imageFile ? (
              <Button type="button" variant="outline" onClick={clearImage}>
                <Icon
                  icon="mdi:trash"
                  fontSize={24}
                  className="cursor-pointer text-red-600"
                />
              </Button>
            ) : null}
          </div>

          {imageUrl && !imageFile && (
            <Image
              src={imageUrl}
              alt="Preview"
              width={450}
              height={200}
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

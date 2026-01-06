"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import InputField from "./InputField";
import { Post } from "@/app/types";
import { ImageField } from "./ImageField";
import { deleteImage, uploadImage } from "@/features/cloudinary/actions";
import { updatePost, createPost } from "@/features/post/actions";
import Image from "next/image";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { useRouter } from "next/navigation";
import { useProgress } from "@/providers/ProgressProvider";
import { SelectField } from "./SelectField";
import { recipeCategoryOptions } from "@/utils/constants";
import { Form } from "../ui/form";
import IngredientsField from "./IngredientsField";

const postSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().min(1, "Instruction is required"),
  imageUrl: z.string(),
  category: z.string().min(1, "Category is required"),
  ingredients: z
    .array(z.string().trim().min(1, "Ingredient is required"))
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
      title: post?.title || "",
      content: post?.content || "",
      category: post?.category || "",
      ingredients: post?.ingredients?.length ? post.ingredients : [" "],
      imageUrl: post?.imageUrl || "",
      imageFile: undefined,
    },
    resolver: zodResolver(postSchema),
    mode: "onChange",
  });

  const isSubmitting = methods.formState.isSubmitting;
  const imageUrl = useWatch({ control: methods.control, name: "imageUrl" });
  const imageFile = useWatch({ control: methods.control, name: "imageFile" });

  // console.log("watch", methods.watch());
  // console.log("err", methods.formState.errors);

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
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <InputField
            inputType="input"
            type="text"
            name="title"
            label="Recipe Title *"
          />
          <SelectField
            name="category"
            label="Category *"
            options={recipeCategoryOptions}
          />
          <IngredientsField />
          <InputField
            inputType="textarea"
            name="content"
            label="Instruction *"
          />
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
          <Button variant="primary" disabled={isSubmitting} type="submit">
            {isSubmitting
              ? `${post ? "Editing" : "Creating"}`
              : `${post ? "Edit" : "Create"} `}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};

export default PostForm;

"use client";
import { createBlogPost, updateBlogPost } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import FormField from "./FormField";
import { BlogPost } from "@/app/types";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.url().min(1, "Url is required"),
});

export type BlogFormData = z.infer<typeof blogSchema>;

const BlogForm = ({
  post,
}: {
  post?: Pick<BlogPost, "id" | "title" | "content" | "imageUrl">;
}) => {
  const methods = useForm<BlogFormData>({
    defaultValues: {
      title: post?.title,
      content: post?.content,
      imageUrl: post?.imageUrl,
    },
    resolver: zodResolver(blogSchema),
    mode: "onChange",
  });

  const isSubmitting = methods.formState.isSubmitting;

  const onSubmit = async (data: BlogFormData) =>
    post ? updateBlogPost(data, post.id) : createBlogPost(data);

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
        <div className="flex flex-col gap-2">
          <FormField
            inputType="input"
            type="url"
            name="imageUrl"
            label="Image URL"
            placeholder="Image Url"
          />
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

export default BlogForm;

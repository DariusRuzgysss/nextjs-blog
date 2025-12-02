"use client";
import { createBlogPost } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import FormField from "./FormField";

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  url: z.url().min(1, "Url is required"),
});

export type BlogFormData = z.infer<typeof blogSchema>;

const BlogForm = () => {
  const methods = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    mode: "onChange",
  });

  const isSubmitting = methods.formState.isSubmitting;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(createBlogPost)}
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
            name="url"
            label="Image URL"
            placeholder="Image Url"
          />
        </div>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating Post" : "Create Post"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default BlogForm;

import { HTMLInputTypeAttribute } from "react";
import { Path } from "react-hook-form";

export type FormFieldProps<TFormValues> = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  name: Path<TFormValues>;
  label?: string;
  valueAsNumber?: boolean;
};

export type BlogPost = {
  title: string;
  content: string;
  id: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  isSeen: boolean;
  createdAt: Date;
  updatedAt: Date;
};

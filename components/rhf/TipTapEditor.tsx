"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { getErrorMessage } from "@/lib/helper";
import TextEditorMenuBar from "../general/RichTextEditor/TextEditorMenuBar";

type RichTextEditorProps = {
  name: string;
  label: string;
};

export default function TipTapEditor({ name, label }: RichTextEditorProps) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessage(errors, name);

  const content = watch(name);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4 my-2",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4 my-2",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content,
    editorProps: {
      attributes: {
        class: "h-[230px] overflow-y-auto p-4 border-(--dark) rounded-b-md ",
      },
    },
    onUpdate: ({ editor }) => {
      setValue(name, editor.getHTML(), {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    immediatelyRender: false,
  });

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <FormItem className="border-(--dark)">
          <FormLabel>{label}</FormLabel>
          {editor && <TextEditorMenuBar editor={editor} />}
          <FormControl>
            <EditorContent editor={editor} />
          </FormControl>
          {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
        </FormItem>
      )}
    />
  );
}

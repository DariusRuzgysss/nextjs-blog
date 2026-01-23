import React, { useEffect, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import Toggle from "./Toggle";

export default function TextEditorMenuBar({
  editor,
}: {
  editor: Editor | null;
}) {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (!editor) return;
    const updateHandler = () => forceUpdate({});
    editor.on("selectionUpdate", updateHandler);
    editor.on("transaction", updateHandler);
    return () => {
      editor.off("selectionUpdate", updateHandler);
      editor.off("transaction", updateHandler);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 border rounded-t-md p-2">
      <Toggle onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <Bold />
      </Toggle>

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </Toggle>

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough />
      </Toggle>

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List />
      </Toggle>

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </Toggle>

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter />
      </Toggle>
    </div>
  );
}

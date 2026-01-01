"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useTransition } from "react";

type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
};

export function CustomDialog({ title, description, onConfirm }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      onConfirm();
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Icon
          icon="mdi:trash"
          fontSize={24}
          className="cursor-pointer text-red-600 hover:opacity-80"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form action={handleDelete} className="flex justify-end gap-3 mt-6">
          <button
            className={buttonVariants({ variant: "secondary" })}
            disabled={isPending}
          >
            {isPending ? "Processing..." : "Confirm"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

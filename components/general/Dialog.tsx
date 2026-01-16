import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Activity, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Spinner } from "../ui/spinner";

type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
};

export function CustomDialog({ title, description, onConfirm }: Props) {
  const t = useTranslations();
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
          className="cursor-pointer text-destructive hover:opacity-80"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(title)}</DialogTitle>
          <DialogDescription>{t(description)}</DialogDescription>
        </DialogHeader>

        <form action={handleDelete} className="flex justify-end gap-3 mt-6">
          <Button
            variant="primary"
            disabled={isPending}
            className="flex flex-row gap-2"
          >
            <Activity mode={isPending ? "visible" : "hidden"}>
              <Spinner className="size-6 text-background" />
            </Activity>
            {isPending ? t("Actions.confirming") : t("Actions.confirm")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Input } from "../ui/input";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { getErrorMessage, resizeImageWithCanvas } from "@/utils/helper";
import { Activity, useRef, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface Props {
  name: string;
  label?: string;
}

export const ImageField = ({ name, label }: Props) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [isPending, startTransition] = useTransition();

  const imageFile = watch(name);
  const imageUrl = watch("imageUrl");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    startTransition(async () => {
      const resizedFile = await resizeImageWithCanvas(file);
      setValue(name, resizedFile, {
        shouldValidate: true,
      });
    });
  };

  const clearImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue(name, undefined, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("imageUrl", "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const errorMessage = getErrorMessage(errors, name);

  return (
    <FormField
      name={name}
      control={control}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl className="flex flex-row justify-between">
            <div>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
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
          </FormControl>

          <div className="flex flex-col justify-center items-center">
            {imageFile && (
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                width={450}
                height={300}
                className="object-contain"
              />
            )}
            <Activity mode={isPending ? "visible" : "hidden"}>
              <Spinner className="size-6" />
            </Activity>
          </div>
          {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

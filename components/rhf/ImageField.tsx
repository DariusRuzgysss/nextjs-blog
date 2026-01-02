"use client";

import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";
import { Input } from "../ui/input";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { resizeImageWithCanvas } from "@/utils/helper";
import { Activity, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";

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

  const imageFile = watch("imageFile");
  const imageUrl = watch("imageUrl");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    startTransition(async () => {
      const resizedFile = await resizeImageWithCanvas(file);
      setValue("imageFile", resizedFile, {
        shouldValidate: true,
      });
    });
  };

  const clearImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue("imageFile", undefined);
    setValue("imageUrl", "");
  };

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <div className="w-full flex flex-col gap-2">
          {label && <label>{label}</label>}
          <div className="flex flex-row justify-between">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
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
          {errors && errors[name] && (
            <span className="text-red-700">
              {errors[name]?.message as string}
            </span>
          )}
        </div>
      )}
    />
  );
};

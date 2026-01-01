"use client";

import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";
import { Input } from "../ui/input";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";

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

  const imageFile = watch("imageFile");
  const imageUrl = watch("imageUrl");

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
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) {
                  return;
                }
                setValue("imageFile", f, { shouldValidate: true });
              }}
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

          {imageFile && (
            <div className="flex flex-col justify-center items-center">
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                width={450}
                height={300}
                className="object-contain"
              />
            </div>
          )}
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

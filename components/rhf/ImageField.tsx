"use client";

import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";
import { Input } from "../ui/input";

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

  const file = watch("imageFile");

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <div className="flex flex-col gap-2">
          {label && <label>{label}</label>}
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

          {file && (
            <Image
              src={URL.createObjectURL(file)}
              alt="Preview"
              width={450}
              height={200}
              className="object-contain"
            />
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

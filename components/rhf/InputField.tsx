import { FormFieldProps } from "@/app/types";
import { Input } from "../ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { getErrorMessage } from "@/utils/helper";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface UnifiedFieldProps<TFormValues> extends FormFieldProps<TFormValues> {
  inputType: "input" | "textarea";
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const InputField = <TFormValues extends Record<string, string>>({
  inputType,
  type,
  placeholder,
  name,
  label,
  valueAsNumber,
  inputProps,
  textareaProps,
}: UnifiedFieldProps<TFormValues>) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessage(errors, name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {inputType === "input" ? (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                {...register(name, { valueAsNumber })}
                {...inputProps}
              />
            ) : (
              <Textarea
                {...field}
                placeholder={placeholder}
                {...register(name, { valueAsNumber })}
                {...textareaProps}
              />
            )}
          </FormControl>
          {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default InputField;

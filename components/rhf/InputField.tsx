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
  className,
  fieldValue,
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
          <div className="flex flex-row justify-between">
            <FormLabel>{label}</FormLabel>
            {fieldValue && <FormLabel>{fieldValue}</FormLabel>}
          </div>
          <FormControl>
            {inputType === "input" ? (
              <Input
                className={className}
                {...field}
                type={type}
                placeholder={placeholder}
                {...register(name, { valueAsNumber })}
                {...inputProps}
              />
            ) : (
              <Textarea
                className={className}
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

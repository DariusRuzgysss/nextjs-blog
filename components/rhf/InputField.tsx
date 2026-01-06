import { FormFieldProps } from "@/app/types";
import { Input } from "../ui/input";
import { FieldErrors, FieldValues, get, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FieldError } from "react-hook-form";
import { getErrorMessage } from "@/utils/helper";

interface UnifiedFieldProps<TFormValues> extends FormFieldProps<TFormValues> {
  inputType: "input" | "textarea";
}

const InputField = <TFormValues extends Record<string, string>>({
  inputType,
  type,
  placeholder,
  name,
  label,
  valueAsNumber,
}: UnifiedFieldProps<TFormValues>) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessage(errors, name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {inputType === "input" ? (
              <Input
                type={type}
                placeholder={placeholder}
                {...register(name, { valueAsNumber })}
                {...field}
              />
            ) : (
              <Textarea
                placeholder={placeholder}
                {...register(name, { valueAsNumber })}
                {...field}
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

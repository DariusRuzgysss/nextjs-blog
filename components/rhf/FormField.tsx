import { FormFieldProps } from "@/app/types";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface UnifiedFieldProps<TFormValues> extends FormFieldProps<TFormValues> {
  inputType: "input" | "textarea";
}

const FormField = <TFormValues extends Record<string, string>>({
  inputType,
  type,
  placeholder,
  name,
  label,
  valueAsNumber,
}: UnifiedFieldProps<TFormValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      {inputType === "input" ? (
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, { valueAsNumber })}
        />
      ) : (
        <Textarea
          placeholder={placeholder}
          {...register(name, { valueAsNumber })}
        />
      )}
      {errors && errors[name] && (
        <span className="text-red-700">{errors[name]?.message as string}</span>
      )}
    </div>
  );
};

export default FormField;

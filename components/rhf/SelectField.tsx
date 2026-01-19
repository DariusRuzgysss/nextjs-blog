import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getErrorMessage } from "@/lib/helper";
import { useTranslations } from "next-intl";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
};

export function SelectField<T extends FieldValues>({
  name,
  label,
  placeholder = "ManageRecipePage.selectOption",
  options,
  disabled,
}: FormSelectProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations();
  const errorMessage = getErrorMessage(errors, name);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <FormControl className="border-(--dark)/20">
              <SelectTrigger>
                <SelectValue placeholder={t(placeholder)} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
        </FormItem>
      )}
    />
  );
}

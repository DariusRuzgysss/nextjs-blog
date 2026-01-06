import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import InputField from "./InputField";

const IngredientsField = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <div className="flex flex-col gap-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-row gap-2 items-center w-full">
          <div className="flex-1">
            <InputField
              inputType="input"
              type="text"
              name={`ingredients.${index}`}
              label={`Ingredient ${index + 1}`}
            />
          </div>

          {index !== 0 && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
            >
              <X />
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="flex items-center gap-2 w-full"
        onClick={() => append(" ")}
      >
        <Plus className="text-[#EE6352]" />
        <span>Add ingredient</span>
      </Button>
    </div>
  );
};

export default IngredientsField;

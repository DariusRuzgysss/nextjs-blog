import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import InputField from "./InputField";
import { useTranslations } from "next-intl";

const IngredientsField = () => {
  const t = useTranslations();
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <div className="flex flex-col gap-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-start">
          <div className="flex-1">
            <InputField
              inputType="input"
              type="text"
              name={`ingredients.${index}`}
              label={`${t("ManageRecipePage.ingredient")} ${index + 1} *`}
            />
          </div>

          {index !== 0 && (
            <div className="flex items-center pt-[22px]">
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                <X />
              </Button>
            </div>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="link"
        size="icon"
        className="flex items-center gap-2 w-full"
        onClick={() => append(" ")}
      >
        <Plus className="text-[#EE6352]" />
        <span>{t("Actions.addIngredient")}</span>
      </Button>
    </div>
  );
};

export default IngredientsField;

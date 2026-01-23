import { z } from "zod";
import { useTranslations } from "next-intl";
import { stripHtml } from "./helper";

export const postFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    title: z.string().trim().min(1, t("ManageRecipePage.requiredFields.title")),
    content: z.string().refine((value) => stripHtml(value).length > 0, {
      message: t("ManageRecipePage.requiredFields.instructions"),
    }),
    imageUrl: z.string(),
    preparationTime: z.number().int(),
    calories: z.number().int(),
    category: z.string().min(1, t("ManageRecipePage.requiredFields.category")),
    ingredients: z
      .array(
        z
          .string()
          .trim()
          .nonempty(t("ManageRecipePage.requiredFields.emptyIngredient")),
      )
      .min(1, t("ManageRecipePage.requiredFields.ingredients")),
    imageFile: z
      .instanceof(File)
      .refine((f) => f.size > 0, "Image file is required")
      .optional(),
  });

export type PostFormSchema = z.infer<ReturnType<typeof postFormSchema>>;

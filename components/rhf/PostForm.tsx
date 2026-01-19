"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button } from "../ui/button";
import InputField from "./InputField";
import { PostFormType } from "@/types";
import { ImageField } from "./ImageField";
import { deleteImage, uploadImage } from "@/features/cloudinary/actions";
import { updatePost, createPost } from "@/features/post/actions";
import Image from "next/image";
import { useQueryMutate } from "@/hooks/api/useMutate";
import { useRouter } from "next/navigation";
import { useProgress } from "@/providers/ProgressProvider";
import { SelectField } from "./SelectField";
import IngredientsField from "./IngredientsField";
import ProgressBar from "../general/ProgressBar";
import { useTranslations } from "next-intl";
import useAiClient from "@/hooks/useAiClient";
import LoaderDots from "../general/LoaderDots";
import { postFormSchema, PostFormSchema } from "@/lib/validations";
import {
  aiPromptMessage,
  IMAGE_SIZES,
  RECIPE_CATEGORY_OPTIONS,
} from "@/lib/constants";
import { minutesToHours, stringArrayChangedNormalized } from "@/lib/helper";

const PostForm = ({ post }: { post?: PostFormType }) => {
  const t = useTranslations();
  const router = useRouter();
  const progress = useProgress();
  const { ask } = useAiClient();

  const methods = useForm<PostFormSchema>({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      category: post?.category || "",
      preparationTime: post?.preparationTime || 0,
      ingredients: post?.ingredients?.length ? post.ingredients : [" "],
      imageUrl: post?.imageUrl || "",
      imageFile: undefined,
      calories: post?.calories || 0,
    },
    resolver: zodResolver(postFormSchema(t)),
    mode: "onChange",
  });

  const isSubmitting = methods.formState.isSubmitting;
  const imageUrl = useWatch({ control: methods.control, name: "imageUrl" });
  const imageFile = useWatch({ control: methods.control, name: "imageFile" });
  const preparationTime = useWatch({
    control: methods.control,
    name: "preparationTime",
  });

  const updatePostMutation = useQueryMutate<string, PostFormSchema, void>(
    undefined,
    updatePost,
    [],
    () => router.push(`/post/${post?.id}`),
    t("Toasts.recipeUpdated"),
  );

  const createPostMutation = useQueryMutate<null, PostFormSchema, void>(
    createPost,
    undefined,
    [],
    () => router.push("/dashboard"),
    t("Toasts.recipeAdded"),
  );

  const onSubmit = async (data: PostFormSchema) => {
    progress.start();
    const dataCopy = { ...data };
    if (dataCopy.imageUrl && dataCopy.imageFile) {
      await deleteImage(dataCopy.imageUrl);
    }
    progress.set(20);
    if (!dataCopy.imageUrl && !dataCopy.imageFile && post?.imageUrl) {
      await deleteImage(post.imageUrl);
    }
    progress.set(40);
    if (dataCopy.imageFile) {
      const res = await uploadImage(dataCopy.imageFile);
      if (res.success && res.result?.secure_url) {
        dataCopy.imageUrl = res.result.secure_url;
      }
      delete dataCopy.imageFile;
    }
    progress.set(60);
    let kcalPer100g = dataCopy.calories;
    if (
      stringArrayChangedNormalized(
        post?.ingredients || [],
        dataCopy.ingredients,
      )
    ) {
      progress.set(70);
      const aiMessage = `${aiPromptMessage} ${dataCopy.ingredients.join("\n")}`;
      const aiCalories = await ask(aiMessage);
      kcalPer100g = Math.round(
        parseFloat(aiCalories.trim().replace(/[^\d.]/g, "")) || 0,
      );
    }
    progress.set(80);
    if (post) {
      await updatePostMutation.mutateAsync({
        id: post.id,
        data: { ...dataCopy, calories: kcalPer100g },
      });
    } else {
      await createPostMutation.mutateAsync({
        id: null,
        data: { ...dataCopy, calories: kcalPer100g },
      });
    }
    progress.finish();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <InputField
          inputType="input"
          type="text"
          name="title"
          label={t("ManageRecipePage.recipeTitle") + " *"}
        />
        <SelectField
          name="category"
          label={t("ManageRecipePage.category") + " *"}
          options={RECIPE_CATEGORY_OPTIONS.slice(
            1,
            RECIPE_CATEGORY_OPTIONS.length,
          )}
        />
        <IngredientsField />
        <InputField
          inputType="input"
          type="range"
          inputProps={{
            min: 0,
            max: 250,
            step: 5,
            disabled: isSubmitting,
          }}
          valueAsNumber={true}
          name="preparationTime"
          label={t("ManageRecipePage.preparationTime")}
          fieldValue={minutesToHours(preparationTime)}
        />
        <InputField
          inputType="textarea"
          name="content"
          label={t("ManageRecipePage.instructions") + " *"}
        />
        <div className="flex flex-col gap-2">
          <ImageField
            name="imageFile"
            label={t("ManageRecipePage.chooseImage")}
          />

          {imageUrl && !imageFile && (
            <Image
              src={imageUrl}
              alt="Preview"
              width={IMAGE_SIZES.THUMBNAIL.width}
              height={IMAGE_SIZES.THUMBNAIL.height}
              style={{
                width: "auto",
                height: "auto",
              }}
              className="object-contain"
            />
          )}
        </div>
        <ProgressBar />
        {progress.value === 70 && (
          <div className="flex flex-row gap-4">
            <p className="font-medium">
              {t("ManageRecipePage.aiCalculatingCalories")}
            </p>
            <LoaderDots dotCount={3} dotSize={10} />
          </div>
        )}
        <Button variant="primary" disabled={isSubmitting} type="submit">
          {isSubmitting
            ? `${post ? t("Actions.updating") : t("Actions.saving")}`
            : `${post ? t("Actions.update") : t("Actions.save")} `}
        </Button>
      </form>
    </FormProvider>
  );
};
export default PostForm;

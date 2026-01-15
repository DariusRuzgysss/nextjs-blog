import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import AnimationWrapperClient from "./AnimationWrapperClient";

const UnleashCulinary = () => {
  const t = useTranslations();
  return (
    <AnimationWrapperClient
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex flex-col items-center justify-center border rounded-4xl h-[430px] lg:h-[550px] text-center bg-[url('/images/culinary.jpg')] bg-cover bg-center bg-no-repeat bg-black/50 bg-blend-overlay">
        <div className="font-extrabold lg:text-[80px] text-[38px] text-background leading-none uppercase">
          <p>{t("HomePage.unleashCulinary")}</p>
          <p>{t("HomePage.excellence")}</p>
        </div>
        <p className="mt-3 mb-6 text-background text-[16px] lg:text-[21px] px-4  lg:w-[470px]">
          {t("HomePage.unleashCulinaryExcellenceDesc")}
        </p>
        <Button
          className="uppercase active:border border-(--primaryColor2)"
          variant="primary"
        >
          {t("HomePage.exploreRecipes")}
        </Button>
      </div>
    </AnimationWrapperClient>
  );
};

export default UnleashCulinary;

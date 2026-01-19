import { useTranslations } from "next-intl";
import AnimationWrapperClient from "./AnimationWrapperClient";
import Image from "next/image";

const UnleashCulinary = () => {
  const t = useTranslations();

  return (
    <AnimationWrapperClient
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="relative flex flex-col items-center justify-center gap-4 border rounded-4xl h-[430px] lg:h-[550px] text-center overflow-hidden">
        <Image
          src="/images/culinary.jpg"
          fill
          fetchPriority="high"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="culinary"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 font-extrabold lg:text-[80px] text-[38px] text-background leading-none uppercase">
          <p>{t("HomePage.unleashCulinary")}</p>
          <p>{t("HomePage.excellence")}</p>
        </div>

        <p className="relative z-10 mt-3 mb-6 text-background text-[16px] lg:text-[21px] px-4 lg:w-[470px]">
          {t("HomePage.unleashCulinaryExcellenceDesc")}
        </p>
      </div>
    </AnimationWrapperClient>
  );
};

export default UnleashCulinary;

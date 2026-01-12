import { Button } from "../ui/button";
import AnimationWrapper from "./AnimationWrapper";

const UnleashCulinary = () => {
  return (
    <AnimationWrapper
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex flex-col items-center justify-center border rounded-4xl h-[430px] lg:h-[550px] text-center bg-[url('/images/culinary.jpg')] bg-cover bg-center bg-no-repeat bg-black/50 bg-blend-overlay">
        <div className="font-extrabold lg:text-[80px] text-[38px] text-background leading-none uppercase">
          <p>Unleash Culinary</p>
          <p>Excellence</p>
        </div>
        <p className="mt-3 mb-6 text-background text-[16px] lg:text-[21px] px-4  lg:w-[470px]">
          Explore a world of flavors, discover handcrafted recipes, and let the
          aroma of our passion for cooking fill your kitchen
        </p>
        <Button
          className="uppercase active:border border-(--primaryColor2)"
          variant="primary"
        >
          Explore recipes
        </Button>
      </div>
    </AnimationWrapper>
  );
};

export default UnleashCulinary;

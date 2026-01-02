import { Button } from "../ui/button";

const UnleashCulinary = () => {
  return (
    <div className="border rounded-4xl h-[430px] lg:h-[550px] text-center bg-[url('/images/culinary.jpg')] bg-cover bg-center bg-no-repeat bg-black/50 bg-blend-overlay flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="font-extrabold lg:text-[80px] text-[38px] text-background leading-none uppercase">
          Unleash Culinary
          <p>Excellence</p>
        </p>
        <p className="mt-3 mb-6 text-background text-[16px] lg:text-[21px] px-4 md:px-20 lg:w-[470px]">
          Explore a world of flavors, discover handcrafted recipes, and let the
          aroma of our passion for cooking fill your kitchen
        </p>
        <Button
          className="uppercase active:border border-(--primary-color-2)"
          variant="primary"
        >
          Explore recipes
        </Button>
      </div>
    </div>
  );
};

export default UnleashCulinary;

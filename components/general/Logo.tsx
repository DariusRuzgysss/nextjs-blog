import { IMAGE_SIZES, ROUTES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

type Props = {
  titleColor?: string;
};

const Logo = ({ titleColor }: Props) => {
  return (
    <Link
      href={ROUTES.HOME}
      className="flex flex-row gap-3 items-center active:bg-active lg:active:bg-transparent relative"
    >
      <Image
        src={"/images/nav-logo.png"}
        alt="logo"
        width={IMAGE_SIZES.LOGO.width}
        height={IMAGE_SIZES.LOGO.height}
        style={{
          width: "auto",
          height: "auto",
        }}
      />
      <div className={`${titleColor} leading-none font-bold`}>
        <p className="text-[15px] uppercase">Skonių</p>
        <p className="text-[20px] uppercase">Pasaulis</p>
      </div>
    </Link>
  );
};

export default Logo;

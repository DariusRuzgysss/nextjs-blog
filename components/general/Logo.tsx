import Image from "next/image";
import Link from "next/link";

type Props = {
  titleColor?: string;
};

const Logo = ({ titleColor }: Props) => {
  return (
    <Link
      href="/"
      className="flex flex-row gap-3 items-center active:bg-active lg:active:bg-transparent"
    >
      <Image src={"/images/nav-logo.png"} alt="logo" width={40} height={80} />
      <div className={`${titleColor} leading-none font-bold`}>
        <p className="text-[15px] uppercase">Skonių</p>
        <p className="text-[20px] uppercase">Pasaulis</p>
      </div>
    </Link>
  );
};

export default Logo;

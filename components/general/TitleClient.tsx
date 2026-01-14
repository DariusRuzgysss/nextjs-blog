import { useTranslations } from "next-intl";
import { JSX } from "react";

type TitleClientProps = {
  title: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
};

const TitleClient = ({ title, className, tag }: TitleClientProps) => {
  const t = useTranslations();
  const Tag = tag || "p";
  return <Tag className={className}>{t(title)}</Tag>;
};

export default TitleClient;

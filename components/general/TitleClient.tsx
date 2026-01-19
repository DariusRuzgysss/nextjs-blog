import { useTranslations } from "next-intl";
import { JSX } from "react";

type TitleComponentProps = {
  title: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
};

const TitleComponent = ({ title, className, tag }: TitleComponentProps) => {
  const t = useTranslations();
  const Tag = tag || "p";
  return <Tag className={className}>{t(title)}</Tag>;
};

export default TitleComponent;

import { PostFormType } from "@/app/types";
import PostForm from "../rhf/PostForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useTranslations } from "next-intl";

type Props = {
  title: string;
  description: string;
  post?: PostFormType;
};

const CardPostForm = ({ title, description, post }: Props) => {
  const t = useTranslations();
  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle>{t(title)}</CardTitle>
        <CardDescription>{t(description)}</CardDescription>
      </CardHeader>
      <CardContent>
        <PostForm post={post} />
      </CardContent>
    </Card>
  );
};

export default CardPostForm;

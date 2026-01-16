import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SortSelect from "./SortSelect";
import { useTranslations } from "next-intl";

export function FilterDrawer() {
  const t = useTranslations();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">
          <Filter />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-2xl px-4">
        <DrawerHeader>
          <DrawerTitle className="uppercase text-2xl">
            {t("Filters.filter")}
          </DrawerTitle>
          <DrawerDescription>{t("Filters.filterDesc")}</DrawerDescription>
        </DrawerHeader>

        <SortSelect />

        <DrawerFooter className="p-0 pb-4 pt-8 flex items-center justify-center">
          <DrawerClose asChild>
            <Button className="w-full lg:w-1/3" variant="primary">
              {t("Actions.cancel")}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

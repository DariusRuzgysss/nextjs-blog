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
  const t = useTranslations("Filters");
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">
          <Filter />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle className="uppercase text-2xl">
              {t("filter")}
            </DrawerTitle>
            <DrawerDescription>{t("filterDesc")}</DrawerDescription>
          </DrawerHeader>
          <div>
            <SortSelect />
          </div>

          <DrawerFooter className="p-0 py-4">
            <DrawerClose asChild>
              <Button variant="primary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

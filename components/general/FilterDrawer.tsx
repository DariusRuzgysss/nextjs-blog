"use client";
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
import PreparationFilter from "./PreparationFilter";
import { useFilterParams } from "@/hooks/useFilterParams";
import AnimationWrapperClient from "./AnimationWrapperClient";

export function FilterDrawer() {
  const t = useTranslations();
  const { isSet, reset } = useFilterParams();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="relative">
          {isSet && (
            <div className="bg-destructive w-2 h-2 rounded absolute top-1 right-1" />
          )}
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
        <div className="flex flex-col gap-8">
          <SortSelect />
          <PreparationFilter />
        </div>
        <DrawerFooter className="p-0 pb-4 pt-8">
          <div className="flex flex-row gap-4">
            <DrawerClose asChild>
              <Button className="grow" variant="primary">
                {t("Actions.cancel")}
              </Button>
            </DrawerClose>
            {isSet && (
              <AnimationWrapperClient
                initial={{ opacity: 0, x: 0, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="flex"
              >
                <Button className="grow" onClick={reset} variant="destructive">
                  {t("Actions.clear")}
                </Button>
              </AnimationWrapperClient>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

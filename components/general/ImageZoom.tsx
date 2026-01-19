"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import AnimationWrapperClient from "./AnimationWrapperClient";

type ZoomImageProps = ImageProps;

export default function ZoomImage(props: ZoomImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <div className="cursor-pointer">
        <Image {...props} alt={props.alt} />
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer absolute top-2 right-2 bg-black/70 text-white rounded-full w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center text-xl"
        >
          <ZoomIn />
        </button>
      </div>

      {open && (
        <AnimationWrapperClient
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        >
          <Image
            {...props}
            alt={props.alt}
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer absolute top-4 right-4 bg-background text-white rounded-full w-10 h-10 flex items-center justify-center text-xl"
          >
            <ZoomOut className="text-(--dark)" />
          </button>
        </AnimationWrapperClient>
      )}
    </>
  );
}

import { PAGINATION, PREPARATION_TIME } from "@/lib/constants";
import { FilterTypes, SortOptions, UrlParams } from "@/types";
import { FieldErrors, FieldValues, FieldError, get } from "react-hook-form";

export const buildFilter = async (
  urlParams?: UrlParams,
): Promise<FilterTypes> => {
  const searchParams = await urlParams;
  const query = searchParams?.query || "";
  const sortBy = searchParams?.sort || SortOptions.NEWEST_FIRST;
  const category = searchParams?.category || "all";
  const timeMin = Number(searchParams?.timeMin) || PREPARATION_TIME.MIN;
  const timeMax = Number(searchParams?.timeMax) || PREPARATION_TIME.MAX;
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.limit) || PAGINATION.DEFAULT_PAGE_SIZE;

  return {
    searchQuery: query,
    sortBy,
    page,
    pageSize,
    category,
    preparationTime: [timeMin, timeMax],
  };
};

export const resizeImageWithCanvas = (
  file: File,
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.8,
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    reader.onerror = reject;

    img.onload = () => {
      let { width, height } = img;

      // Maintain aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context error");

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Blob creation failed");

          const compressedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          resolve(compressedFile);
        },
        "image/jpeg",
        quality, // 0–1
      );
    };

    img.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getErrorMessage = (
  errors: FieldErrors<FieldValues>,
  name: string,
): string | undefined => {
  const error = get(errors, name) as FieldError | undefined;
  return error?.message;
};

export function minutesToHours(minutes: number) {
  if (minutes <= 0) return "0min.";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const parts: string[] = [];

  if (hours) parts.push(`${hours}h`);
  if (mins) parts.push(`${mins}min.`);

  return parts.join(" ");
}

export function getInitialLocale() {
  if (typeof document === "undefined") return "en";

  const cookieLocale = document.cookie
    .split("; ")
    .find((row) => row.startsWith("LOCALE="))
    ?.split("=")[1];

  if (cookieLocale) return cookieLocale;

  document.cookie = "LOCALE=en; ";
  return "en";
}
function stringArrayChanged(prev: string[], next: string[]): boolean {
  if (prev.length !== next.length) return true;

  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== next[i]) return true;
  }

  return false;
}

export function stringArrayChangedNormalized(
  prev: string[],
  next: string[],
): boolean {
  const normalize = (arr: string[]) => arr.map((s) => s.trim().toLowerCase());

  return stringArrayChanged(normalize(prev), normalize(next));
}

export const isSameRange = (a: [number, number], b: [number, number]) =>
  a[0] === b[0] && a[1] === b[1];

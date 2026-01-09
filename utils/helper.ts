import { FieldErrors, FieldValues, FieldError, get } from "react-hook-form";

export const resizeImageWithCanvas = (
  file: File,
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.8
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
        quality // 0–1
      );
    };

    img.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getErrorMessage = (
  errors: FieldErrors<FieldValues>,
  name: string
): string | undefined => {
  const error = get(errors, name) as FieldError | undefined;
  return error?.message;
};

export function minutesToHours(minutes: number) {
  if (minutes <= 0) return "";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const parts: string[] = [];

  if (hours) parts.push(`${hours}h`);
  if (mins) parts.push(`${mins}min.`);

  return parts.join(" ");
}

"use server";
import { v2 as cloudinary } from "cloudinary";
import { UploadResponse } from "./types";
import { extractPublicId } from "cloudinary-build-url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadImage = async (imageFile: File): Promise<UploadResponse> => {
  try {
    const fileBuffer = await imageFile.arrayBuffer();

    const mimeType = imageFile.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    // this will be used to upload the file
    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      resource_type: "auto",
      filename_override: imageFile.name,
      folder: "post-images",
      use_filename: true,
      transformation: [{ width: 1200, crop: "scale" }, { quality: "auto" }],
    });

    return { success: true, result };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const deleteImage = async (imageUrl: string) => {
  const publicId = extractPublicId(imageUrl);
  await cloudinary.uploader.destroy(publicId);
};

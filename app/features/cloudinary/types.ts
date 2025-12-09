import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export type UploadResponse =
  | { success: true; result?: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse };

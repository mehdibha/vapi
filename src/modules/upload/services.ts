import { type PutBlobResult } from "@vercel/blob";

export const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map((file) => {
    return fetch("/api/upload", {
      method: "POST",
      body: file,
    }).then(async (res) => {
      if (res.status === 200) {
        const { url } = (await res.json()) as PutBlobResult;
        return url;
      }
    });
  });

  return Promise.all(uploadPromises);
};

import { atom, useAtom } from "jotai";

export enum UploadingStatus {
  NotUploaded = "NotUploaded",
  Uploading = "UPLOADING",
  Uploaded = "UPLOADED",
}

type Config = {
  uploadingStatus: UploadingStatus;
};

const statusAtom = atom<Config[]>([]);

const areAllImagesUploadedAtom = atom((get) => {
  const imagesUploadingStatus = get(statusAtom);
  return (
    imagesUploadingStatus.length !== 0 &&
    imagesUploadingStatus.every(
      (uploadingStatus) =>
        uploadingStatus.uploadingStatus === UploadingStatus.Uploaded
    )
  );
});

const atLeastOneImageIsUploadingAtom = atom((get) => {
  const imagesUploadingStatus = get(statusAtom);
  return (
    imagesUploadingStatus.findIndex(
      (uploadingStatus) =>
        uploadingStatus.uploadingStatus === UploadingStatus.Uploading
    ) !== -1
  );
});

const areAllImagesNotUploadedAtom = atom((get) => {
  const imagesUploadingStatus = get(statusAtom);
  return (
    imagesUploadingStatus.length === 0 ||
    imagesUploadingStatus.every(
      (uploadingStatus) =>
        uploadingStatus.uploadingStatus === UploadingStatus.NotUploaded
    )
  );
});

export function usePetImagesUploadingStatus() {
  return useAtom(statusAtom);
}

export function useAreAllImagesUploaded() {
  return useAtom(areAllImagesUploadedAtom);
}

export function useAtLeastOneImageIsUploading() {
  return useAtom(atLeastOneImageIsUploadingAtom);
}

export function useAreAllImagesNotUploaded() {
  return useAtom(areAllImagesNotUploadedAtom);
}

import { atom, useAtom } from "jotai";
import { ImageListType } from "react-images-uploading";

const configAtom = atom<ImageListType>([]);

export function usePetImages() {
  return useAtom(configAtom);
}

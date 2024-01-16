import { atom, useAtom } from "jotai";

type Config = {
  petSpecies: string;
  petName: string;
};

const configAtom = atom<Config>({
  petSpecies: "cat",
  petName: "",
});

export function usePetInfo() {
  return useAtom(configAtom);
}

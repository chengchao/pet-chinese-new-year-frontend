import React from "react";
import { Provider } from "jotai";
import PetImagesUploader from "@/components/pet-images-uploader";

export default async function Page({ params }: { params: { petSpecies: string, petName: string } }) {
  return (
    <Provider>
      <PetImagesUploader petSpecies={params.petSpecies} petName={params.petName} />
    </Provider>
  )
}
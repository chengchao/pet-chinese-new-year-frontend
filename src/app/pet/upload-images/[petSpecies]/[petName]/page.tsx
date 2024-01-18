import React from "react";
import { Provider } from "jotai";
import PetImagesUploader from "@/components/pet-images-uploader";

export default async function Page({ params }: { params: { petSpecies: string, petName: string } }) {
  return (
    <Provider>
      <div className="container max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
        <PetImagesUploader petSpecies={params.petSpecies} petName={params.petName} />
      </div>
    </Provider>
  )
}
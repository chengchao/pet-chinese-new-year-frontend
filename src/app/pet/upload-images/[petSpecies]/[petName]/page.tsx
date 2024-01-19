import React from "react";
import { Provider } from "jotai";
import PetImages from "@/components/pet-images";

export default async function Page({ params }: { params: { petSpecies: string, petName: string } }) {
  return (
    <Provider>
      <div className="container max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between mt-6">
          <h3 className="text-2xl font-semibold tracking-tight">
            {`${params.petSpecies}/${params.petName}`}
          </h3>
        </div>
        <div className="my-2">
          <PetImages width={110} height={110} petSpecies={params.petSpecies} petName={params.petName} />
        </div>
      </div>
    </Provider>
  )
}
import { Provider } from "jotai";
import PetImages from "@/components/pet-images";
import { PetNameDisplay } from "@/components/pet-name-display";

export default async function Page({
  params,
}: {
  params: { petSpecies: string; petName: string };
}) {
  return (
    <Provider>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
        <PetNameDisplay
          petSpecies={params.petSpecies}
          petName={params.petName}
        />
        <PetImages petSpecies={params.petSpecies} petName={params.petName} />
      </div>
    </Provider>
  );
}

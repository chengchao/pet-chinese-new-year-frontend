"use client"

import { PetInfoInputForm } from "@/components/pet-info-input-form";
import { Provider } from "jotai";
import { useRouter, redirect } from "next/navigation";

export default function Page() {
  const router = useRouter()

  function onPetNameSubmit(petSpecies: string, petName: string) {
    console.log(`Calling onPetNameSubmit with ${petSpecies}/${petName}`)
    router.push(`/pet/upload-images/${petSpecies}/${petName}`)
  }

  return (
    <Provider>
      <PetInfoInputForm onPetNameSubmit={onPetNameSubmit} />
    </Provider>

  )
}
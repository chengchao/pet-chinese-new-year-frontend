"use client"

import { PetInfoInputForm } from "@/components/pet-info-input-form";
import { Separator } from "@/components/ui/separator";
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
      <div className="container h-screen">
        <div className="space-y-6">
          <div className="mt-4">
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see you on the site.
            </p>
          </div>
          <Separator />
          <PetInfoInputForm onPetNameSubmit={onPetNameSubmit} />
        </div>
        {/* <div className="flex justify-center"></div> */}
      </div>
    </Provider>

  )
}
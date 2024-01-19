"use client"

import React from "react"
import PetImages from "./pet-images"
import PetImagesUploadButton from "./pet-images-upload-button"
import { useAreAllImagesNotUploaded, useAreAllImagesUploaded, useAtLeastOneImageIsUploading, usePetImagesUploadingStatus } from "./use-pet-images-uploading-status"
import PetImagesTrainButton from "./pet-images-train-button"

interface PetImagesUploaderProps {
  petSpecies: string
  petName: string
}

export default function PetImagesUploader({ petSpecies, petName }: PetImagesUploaderProps) {
  const [areAllImagesUploaded] = useAreAllImagesUploaded()
  const [atLeastOneImageIsUploading] = useAtLeastOneImageIsUploading()
  const [areAllImagesNotUploaded] = useAreAllImagesNotUploaded()
  const [imagesUploadingStatus] = usePetImagesUploadingStatus()

  const asLeastOneImageAdded = imagesUploadingStatus.length !== 0
  const prefix = `${petSpecies}/${petName}`

  return (
    <div className="my-2 space-y-2">
      <PetImages width={110} height={110} />
      <div className="flex justify-center h-12">
        <div className="flex flex-col justify-center">
          {asLeastOneImageAdded && areAllImagesNotUploaded && <PetImagesUploadButton imagePrefix={prefix} />}
          {atLeastOneImageIsUploading && <p>Uploading</p>}
          {areAllImagesUploaded && <PetImagesTrainButton imagePrefix={prefix} />}
        </div>
      </div>
    </div>
  )
}

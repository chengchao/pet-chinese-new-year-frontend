"use client"

import React from "react"
import PetImages from "./pet-images"
import PetImagesUploadButton from "./pet-images-upload-button"
import { useAreAllImagesNotUploaded, useAreAllImagesUploaded, useAtLeastOneImageIsUploading, usePetImagesUploadingStatus } from "./use-pet-images-uploading-status"

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
    // <div>
    //   {
    //     isUploaded ?
    //       <>
    //         <Button onClick={() => setUploaded(false)}>Reset</Button>
    //         <>
    //           <Button onClick={() => { }}>Train</Button>
    //           <PetImagesPreviewer imagePrefix={prefix} />
    //         </>
    //       </> :
    //       <div className="my-2 space-y-2">
    //         <div className="flex justify-center">
    //           <PetImagesUploadButton imagePrefix={prefix} onUploadFinish={() => setUploaded(true)} />
    //         </div>
    //         <PetImagesEditor />
    //       </div>
    //   }
    // </div>
    <div className="my-2 space-y-2">
      <PetImages width={150} height={150} />
      <div className="flex justify-center h-12">
        <div className="flex flex-col justify-center">
          {asLeastOneImageAdded && areAllImagesNotUploaded && <PetImagesUploadButton imagePrefix={prefix} />}
          {atLeastOneImageIsUploading && <p>Uploading</p>}
          {areAllImagesUploaded && <p>Success</p>}
        </div>
      </div>
    </div>
  )
}

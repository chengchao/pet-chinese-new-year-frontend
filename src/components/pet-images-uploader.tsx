"use client"

import React from "react"
import PetImagesEditor from "./pet-images-editor"
import PetImagesUploadButton from "./pet-images-upload-button"
import PetImagesPreviewer from "./pet-images-previewer"
import { Button } from "./ui/button"

interface PetImagesUploaderProps {
  petSpecies: string
  petName: string
}

export default function PetImagesUploader({ petSpecies, petName }: PetImagesUploaderProps) {
  const [isUploaded, setUploaded] = React.useState(false)
  const prefix = `${petSpecies}/${petName}`

  return (
    <div>
      {
        isUploaded ?
          <>
            <Button onClick={() => setUploaded(false)}>Reset</Button>
            <>
              <Button onClick={() => { }}>Train</Button>
              <PetImagesPreviewer imagePrefix={prefix} />
            </>
          </> :
          <div className="my-2 space-y-2">
            <div className="flex justify-center">
              <PetImagesUploadButton imagePrefix={prefix} onUploadFinish={() => setUploaded(true)} />
            </div>
            <PetImagesEditor />
          </div>
      }
    </div>
  )
}

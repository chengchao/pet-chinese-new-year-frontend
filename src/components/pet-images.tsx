"use client"

import React from "react";
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Button } from "@/components/ui/button";
import { usePetImages } from "./use-pet-images";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { UploadingStatus, useAreAllImagesNotUploaded, useAreAllImagesUploaded, useAtLeastOneImageIsUploading, usePetImagesUploadingStatus } from "./use-pet-images-uploading-status";
import { cn } from "@/lib/utils";
import PetImagesUploadButton from "./pet-images-upload-button";
import PetImagesTrainButton from "./pet-images-train-button";
import { ButtonLoading } from "./please-wait-loading-button";

interface PetImagesProps extends React.HTMLAttributes<HTMLDivElement> {
  petSpecies: string
  petName: string
  width?: number
  height?: number
}

export default function PetImages({ width, height, petSpecies, petName, className, ...props }: PetImagesProps) {
  const [images, setImages] = usePetImages()
  const [imagesUploadingStatus, setImagesUploadingStatus] = usePetImagesUploadingStatus()
  const maxNumber = 25

  const [areAllImagesUploaded] = useAreAllImagesUploaded()
  const [atLeastOneImageIsUploading] = useAtLeastOneImageIsUploading()
  const [areAllImagesNotUploaded] = useAreAllImagesNotUploaded()
  const asLeastOneImageAdded = imagesUploadingStatus.length !== 0

  const prefix = `${petSpecies}/${petName}`

  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    // data for submit
    console.log(`Calling onChange: ${imageList} ${addUpdateIndex}`)
    setImages(imageList);
    setImagesUploadingStatus(imageList.map(() => { return { uploadingStatus: UploadingStatus.NotUploaded } }))
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
      }) => (
        // write your building UI
        <div className={cn("", className)} {...props}>
          <div className="flex justify-around h-10 relative">
            {atLeastOneImageIsUploading && <ButtonLoading />}
            {areAllImagesNotUploaded && <Button onClick={onImageUpload}>{asLeastOneImageAdded ? `Add More Pictures` : `Add Pictures`}</Button>}
            {asLeastOneImageAdded && areAllImagesNotUploaded && <PetImagesUploadButton imagePrefix={prefix} />}
            {areAllImagesUploaded && <PetImagesTrainButton imagePrefix={prefix} />}
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <div className="grid grid-cols-3 gap-2 mx-7">
              {imageList.map((image, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative overflow-hidden rounded-md">
                    <Image
                      src={image['data_url']}
                      alt={image.file?.name ?? ""}
                      width={width}
                      height={height}
                      className={cn(
                        "h-auto w-auto object-cover transition-all hover:scale-105", "aspect-square"
                      )}
                    />
                  </div>
                  <div className="h-12">
                    {imagesUploadingStatus[index].uploadingStatus === UploadingStatus.Uploading &&
                      <p>Uploading</p>}
                    {imagesUploadingStatus[index].uploadingStatus === UploadingStatus.Uploaded &&
                      <p>Uploaded</p>}
                    {imagesUploadingStatus[index].uploadingStatus === UploadingStatus.NotUploaded &&
                      <div className="flex flex-col space-y-2">
                        {/* <Button onClick={() => onImageUpdate(index)}>Update</Button> */}
                        <Button onClick={() => onImageRemove(index)}>Remove</Button>
                      </div>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      )}
    </ImageUploading>
  )
}
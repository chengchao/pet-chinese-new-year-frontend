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
import { Loader, Check, Loader2 } from "lucide-react";

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
    setImagesUploadingStatus(imageList.map(() => ({ uploadingStatus: UploadingStatus.NotUploaded })))
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
          <div className="flex justify-around h-10">
            <Button onClick={onImageUpload}>{`Add Pictures`}</Button>
            {
              asLeastOneImageAdded &&
              !areAllImagesUploaded &&
              <PetImagesUploadButton imagePrefix={prefix} disabled={atLeastOneImageIsUploading}>
                {atLeastOneImageIsUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Start to make the digital
              </PetImagesUploadButton>
            }
            {areAllImagesUploaded && <PetImagesTrainButton imagePrefix={prefix}>Go to training page</PetImagesTrainButton>}
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <div className="grid grid-cols-3 gap-2 mx-7">
              {imageList.map((image, index) => (
                <div key={index} className="space-y-2 w-[110px]">
                  <div className="relative overflow-hidden rounded-md">
                    <Image
                      src={image['data_url']}
                      alt={image.file?.name ?? ""}
                      width={width}
                      height={height}
                      className={cn(
                        "z-0 h-auto w-auto object-cover transition-all hover:scale-105", "aspect-square"
                      )}
                    />
                    {imagesUploadingStatus[index].uploadingStatus === UploadingStatus.Uploading &&
                      <Loader className="z-10 absolute animate-spin inset-0 h-[110px] w-[110px]" strokeWidth={1} color="grey" />}
                    {imagesUploadingStatus[index].uploadingStatus === UploadingStatus.Uploaded &&
                      <Check className="z-10 absolute top-0 right-0 h-6 w-6" strokeWidth={3} color="green" />}
                  </div>
                  <div className="h-12">
                    <div className="flex flex-col space-y-2">
                      {/* <Button onClick={() => onImageUpdate(index)}>Update</Button> */}
                      <Button onClick={() => onImageRemove(index)}>Remove</Button>
                    </div>
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
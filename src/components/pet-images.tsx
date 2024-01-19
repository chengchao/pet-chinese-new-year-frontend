"use client"

import React from "react";
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Button } from "@/components/ui/button";
import { usePetImages } from "./use-pet-images";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { UploadingStatus, useAreAllImagesNotUploaded, useAreAllImagesUploaded, useAtLeastOneImageIsUploading, usePetImagesUploadingStatus } from "./use-pet-images-uploading-status";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface PetImagesProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number
  height?: number
}

export default function PetImages({ width, height, className, ...props }: PetImagesProps) {
  const [images, setImages] = usePetImages()
  const [imagesUploadingStatus, setImagesUploadingStatus] = usePetImagesUploadingStatus()
  const maxNumber = 25

  const [areAllImagesUploaded] = useAreAllImagesUploaded()
  const [atLeastOneImageIsUploading] = useAtLeastOneImageIsUploading()
  const [areAllImagesNotUploaded] = useAreAllImagesNotUploaded()

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
          <div className="space-x-2 flex justify-center h-12">
            <div className="flex flex-col justify-center">
              {atLeastOneImageIsUploading && <p>Uploading</p>}
              {areAllImagesUploaded && <p>All images are uploaded</p>}
              {areAllImagesNotUploaded &&
                <div className="space-x-2 flex justify-center">
                  <Button onClick={onImageUpload}>Add Pictures</Button>
                  {/* <Button onClick={onImageRemoveAll}>Remove all</Button> */}
                </div>}
            </div>
          </div>
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea className="h-screen rounded-md">
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
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>


        </div>
      )}
    </ImageUploading>
  )
}
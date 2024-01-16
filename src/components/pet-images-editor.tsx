"use client"

import React from "react";
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Button } from "@/components/ui/button";
import { usePetImages } from "./use-pet-images";
import { Separator } from "./ui/separator";
import Image from "next/image";


export default function PetImagesEditor() {
  const [images, setImages] = usePetImages()
  const maxNumber = 25

  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    // data for submit
    console.log(`Calling onChange: ${imageList} ${addUpdateIndex}`)
    setImages(imageList);
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
        <div className="">
          <div className="space-x-2 flex justify-center">
            <Button onClick={onImageUpload}>Add</Button>
            <Button onClick={onImageRemoveAll}>Remove all</Button>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-4 px-2">
            {imageList.map((image, index) => (
              <div key={index} className="space-y-2">
                <div className="relative h-32">
                  <Image
                    src={image['data_url']}
                    alt=""
                    fill={true}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col space-y-2 h-24">
                  <Button onClick={() => onImageUpdate(index)}>Update</Button>
                  <Button onClick={() => onImageRemove(index)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ImageUploading>
  )
}
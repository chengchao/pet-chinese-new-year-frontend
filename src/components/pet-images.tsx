"use client";

import React from "react";
import { Check, Loader, Loader2 } from "lucide-react";
import ImageUploading, { ImageListType } from "react-images-uploading";

import { Button } from "@/components/ui/button";

import PetImage from "./pet-image";
import PetImageRemoveButton from "./pet-image-remove-button";
import PetImagesTrainButton from "./pet-images-train-button";
import PetImagesUploadButton from "./pet-images-upload-button";
import { Separator } from "./ui/separator";
import { usePetImages } from "./use-pet-images";
import {
  UploadingStatus,
  useAreAllImagesUploaded,
  useAtLeastOneImageIsUploading,
  usePetImagesUploadingStatus,
} from "./use-pet-images-uploading-status";

interface PetImagesProps extends React.HTMLAttributes<HTMLDivElement> {
  petSpecies: string;
  petName: string;
}

export default function PetImages({ petSpecies, petName }: PetImagesProps) {
  const [images, setImages] = usePetImages();
  const [imagesUploadingStatus, setImagesUploadingStatus] =
    usePetImagesUploadingStatus();
  const maxNumber = 25;

  const [areAllImagesUploaded] = useAreAllImagesUploaded();
  const [atLeastOneImageIsUploading] = useAtLeastOneImageIsUploading();
  // const [areAllImagesNotUploaded] = useAreAllImagesNotUploaded()
  const asLeastOneImageAdded = imagesUploadingStatus.length !== 0;

  const prefix = `${petSpecies}/${petName}`;

  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    // data for submit
    console.log(`Calling onChange: ${imageList} ${addUpdateIndex}`);
    setImages(imageList);
    setImagesUploadingStatus(
      imageList.map(() => ({ uploadingStatus: UploadingStatus.NotUploaded }))
    );
  };

  return (
    <div className="my-2">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageRemove }) => (
          // write your building UI
          <div>
            <div className="flex h-10 justify-around">
              <Button onClick={onImageUpload}>{`Add Pictures`}</Button>
              {asLeastOneImageAdded && !areAllImagesUploaded && (
                <PetImagesUploadButton
                  imagePrefix={prefix}
                  disabled={atLeastOneImageIsUploading}
                >
                  {atLeastOneImageIsUploading && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Start to make the digital pet
                </PetImagesUploadButton>
              )}
              {areAllImagesUploaded && (
                <PetImagesTrainButton imagePrefix={prefix}>
                  Go to training page
                </PetImagesTrainButton>
              )}
            </div>
            <Separator className="my-4" />
            <div className="mx-7 grid grid-cols-3 gap-2">
              {imageList.map((image, index) => (
                <PetImage key={index} image={image} width={110} height={110}>
                  <PetImageRemoveButton
                    index={index}
                    onImageRemove={onImageRemove}
                  />
                  {imagesUploadingStatus[index].uploadingStatus ===
                    UploadingStatus.Uploading && (
                    <Loader
                      className="absolute inset-0 z-10 size-[110px] animate-spin"
                      strokeWidth={1}
                      color="grey"
                    />
                  )}
                  {imagesUploadingStatus[index].uploadingStatus ===
                    UploadingStatus.Uploaded && (
                    <Check
                      className="absolute right-0 top-0 z-10 size-6"
                      strokeWidth={3}
                      color="green"
                    />
                  )}
                </PetImage>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

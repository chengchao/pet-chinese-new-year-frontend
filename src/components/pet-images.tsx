"use client";

import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button } from "@/components/ui/button";
import { usePetImages } from "./use-pet-images";
import { Separator } from "./ui/separator";
import {
  UploadingStatus,
  useAreAllImagesUploaded,
  useAtLeastOneImageIsUploading,
  usePetImagesUploadingStatus,
} from "./use-pet-images-uploading-status";
import PetImagesUploadButton from "./pet-images-upload-button";
import PetImagesTrainButton from "./pet-images-train-button";
import { Check, Loader, Loader2 } from "lucide-react";
import PetImage from "./pet-image";
import PetImageRemoveButton from "./pet-image-remove-button";

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
            <div className="flex justify-around h-10">
              <Button onClick={onImageUpload}>{`Add Pictures`}</Button>
              {asLeastOneImageAdded && !areAllImagesUploaded && (
                <PetImagesUploadButton
                  imagePrefix={prefix}
                  disabled={atLeastOneImageIsUploading}
                >
                  {atLeastOneImageIsUploading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
            <div className="grid grid-cols-3 gap-2 mx-7">
              {imageList.map((image, index) => (
                <PetImage key={index} image={image} width={110} height={110}>
                  <PetImageRemoveButton
                    index={index}
                    onImageRemove={onImageRemove}
                  />
                  {imagesUploadingStatus[index].uploadingStatus ===
                    UploadingStatus.Uploading && (
                    <Loader
                      className="z-10 absolute animate-spin inset-0 h-[110px] w-[110px]"
                      strokeWidth={1}
                      color="grey"
                    />
                  )}
                  {imagesUploadingStatus[index].uploadingStatus ===
                    UploadingStatus.Uploaded && (
                    <Check
                      className="z-10 absolute top-0 right-0 h-6 w-6"
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

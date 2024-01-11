"use client"
import React from "react";
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { Button } from "@/components/ui/button"


export default function Page() {
  const [images, setImages] = React.useState<ImageListType>([]);
  const maxNumber = 30;

  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return <>
    <div>
      {/* <input type="file" accept="image/*" multiple onChange={handleChange} /> */}
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
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div>
            <div className="flex space-x-2">
              <Button
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click
              </Button>
              <Button onClick={onImageRemoveAll}>Remove all images</Button>
            </div>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="flex space-x-2">
                  <Button onClick={() => onImageUpdate(index)}>Update</Button>
                  <Button onClick={() => onImageRemove(index)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  </>
}
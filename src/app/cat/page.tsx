"use client"
import React from "react";
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { Button } from "@/components/ui/button";
import OSS from "ali-oss";
import getOssClient from "./aliyun_oss_client";


export default function Page() {
  const [images, setImages] = React.useState<ImageListType>([]);
  const [ossClient, setOssClient] = React.useState<OSS | null>(null);
  const maxNumber = 30;

  async function handleUploadFile(imageList: ImageListType) {
    let newClient = ossClient
    if (newClient === null) {
      newClient = await getOssClient()
      setOssClient(newClient)
    }
    const filePath = 'xxx/xxx/'
    imageList.map(async (image) => {
      if (newClient !== null) {
        const { name, url, res } = await newClient.put(`${filePath}${image.file?.name}`, image.file)
        if (res.status === 200) {
          console.log(`URL: ${url}`)
          return url
        }
      }
    })
  }

  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return <>
    <div>
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
                Pick
              </Button>
              <Button onClick={onImageRemoveAll}>Remove all images</Button>
              <Button onClick={() => handleUploadFile(imageList)}>Train</Button>
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
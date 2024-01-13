"use client"
import React from "react";
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { Button } from "@/components/ui/button";
import OSS from "ali-oss";
import getOssClient from "./aliyun_oss_client";
import { Input } from "@/components/ui/input";
import getImageServerClient from "./image_server_client";
import { Label } from "@/components/ui/label";
import * as Utils from "@/lib/utils"


export default function Page() {
  const [images, setImages] = React.useState<ImageListType>([]);
  const [petName, setPetName] = React.useState<string>("")
  const [ossClient, setOssClient] = React.useState<OSS | null>(null);
  const maxNumber = 30;

  async function handleSaveFiles(imageList: ImageListType) {
    if (petName === "") {
      alert("Pet name must not be empty")
      return
    }

    let newClient = ossClient
    if (newClient === null) {
      newClient = await getOssClient()
      setOssClient(newClient)
    }
    const filePath = `cat/${petName}/`

    const { objects } = await newClient.listV2({ prefix: filePath }, {})
    const filesOnServer = objects.map((obj) => obj.name.substring(filePath.length))
    console.log(`Files on server: ${filesOnServer}`)
    // files got from server doesn't have file prop, we check the name prop instead, which is added in Load step
    const filesShowed = imageList
      .map((image) => image.file?.name || image.name)
      .filter((fileName): fileName is string => !!fileName)
    console.log(`Files showed: ${filesShowed}`)

    const toDelete = Utils.getDifference(filesOnServer, filesShowed)
    console.log(`To delete: ${toDelete}`)
    const toPut = Utils.getDifference(filesShowed, filesOnServer)
    console.log(`To put: ${toPut}`)

    const toPutSet = new Set(toPut)
    await Promise.all(imageList
      .filter((image) =>
        image.file && toPutSet.has(image.file.name)
      ).map(async (image) => {
        newClient = Utils.assertValid(newClient)
        const imageFile = Utils.assertValid(image.file)
        const { name, res } = await newClient.put(`${filePath}${imageFile.name}`, imageFile);
        if (res.status === 200) {
          console.log(`Upload Succeed. Name: ${name}`);
        }
      }))

    await Promise.all(toDelete
      .map(async (fileName) => {
        newClient = Utils.assertValid(newClient)
        const { res } = await newClient.delete(`${filePath}${fileName}`);
        if (res.status === 200) {
          console.log(`Delete Succeed. Name: ${fileName}`);
        }
      }))
  }

  async function handleLoadImage() {
    if (petName === "") {
      alert("Pet name must not be empty")
      return
    }

    let newClient = ossClient
    if (newClient === null) {
      newClient = await getOssClient()
      setOssClient(newClient)
    }

    const filePath = `cat/${petName}/`
    const { objects, res } = await newClient.listV2({ prefix: filePath }, {})
    if (res.status === 200) {
      const images: ImageListType = objects.map((obj) => {
        newClient = Utils.assertValid(newClient)
        const signUrl = newClient.signatureUrl(obj.name, { expires: 600 })
        console.log(`SignUrl: ${signUrl}`)
        return { data_url: signUrl, name: obj.name.substring(filePath.length) }
      })
      onChange(images)
    }
  }

  async function handleTrain(imageList: ImageListType) {
    if (petName === "") {
      alert("Pet name must not be empty")
      return
    }

    let newClient = ossClient
    if (newClient === null) {
      newClient = await getOssClient()
      setOssClient(newClient)
    }

    const filePath = `cat/${petName}/`
    const { objects, res } = await newClient.listV2({ prefix: filePath }, {})
    if (res.status !== 200) {
      alert(`Failed to get server image list, status code ${res.status}`)
      return
    }

    const filesOnServer = objects.map((obj) => obj.name.substring(filePath.length))
    console.log(`Files on server: ${filesOnServer}`)
    // files got from server doesn't have file prop, we check the name prop instead, which is added in Load step
    const filesShowed = imageList
      .map((image) => image.file?.name || image.name)
      .filter((fileName): fileName is string => !!fileName)
    console.log(`Files showed: ${filesShowed}`)

    if (!Utils.areArraysEqual(filesOnServer, filesShowed)) {
      alert("You have either not load the image or have unsaved change!")
      return
    }

    const imageServerClient = getImageServerClient()
    await imageServerClient.sendImagePrefix(filePath)
  }

  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    // data for submit
    console.log(`Calling onChange: ${imageList} ${addUpdateIndex}`)
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
          <div className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              {/* <Label htmlFor="name">Name</Label> */}
              <Input id="name" value={petName} onChange={e => setPetName(e.target.value)}></Input>
              <Button onClick={handleLoadImage}>Load</Button>
            </div>
            <div className="flex space-x-2">
              <Button
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Add
              </Button>
              <Button onClick={onImageRemoveAll}>Remove all</Button>
              <Button onClick={() => handleSaveFiles(imageList)}>Save</Button>
              <Button onClick={() => handleTrain(imageList)}>Train</Button>
            </div>
            {imageList.map((image, index) => (
              <div key={index} className=" space-y-2">
                <div>
                  <img src={image['data_url']} alt="" width="100" />
                  <Label>{image.file?.name || image.name}</Label>
                </div>
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
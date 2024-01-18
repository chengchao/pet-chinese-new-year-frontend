"use client"

import React from "react"
import getOssClient from "./aliyun_oss_client"
import { Button } from "./ui/button"
import { usePetImages } from "./use-pet-images"
import * as Utils from "@/lib/utils"
import { UploadingStatus, usePetImagesUploadingStatus } from "./use-pet-images-uploading-status"

interface PetImagesUploadButtonProps {
  imagePrefix: string
}

export default function PetImagesUploadButton({ imagePrefix }: PetImagesUploadButtonProps) {
  const [images,] = usePetImages()
  const [, setImagesUploadingStatus] = usePetImagesUploadingStatus()

  async function handleUploadFiles() {
    const ossClient = await getOssClient()
    const tempImagesUploadingStatus = images.map((_image) => {
      return { uploadingStatus: UploadingStatus.Uploading }
    })
    setImagesUploadingStatus(tempImagesUploadingStatus)

    const onUpdateStatus = function (status: { uploadingStatus: UploadingStatus }[]) {
      // using the same array won't update the state, I have no idea how it happened
      // TODO: find a smarter way
      setImagesUploadingStatus(status.map((s) => s))
    }

    const loadingStatus = await Promise.all(images
      .map(async (image, index) => {
        const imageFile = Utils.assertValid(image.file)
        const { name, res } = await ossClient.put(`${imagePrefix}${imageFile.name}`, imageFile);
        if (res.status === 200) {
          console.log(`Upload Succeed. Name: ${name}`);
          tempImagesUploadingStatus[index].uploadingStatus = UploadingStatus.Uploaded
          onUpdateStatus(tempImagesUploadingStatus)
          return { uploadingStatus: UploadingStatus.Uploaded }
        }
        tempImagesUploadingStatus[index].uploadingStatus = UploadingStatus.NotUploaded
        onUpdateStatus(tempImagesUploadingStatus)
        return { uploadingStatus: UploadingStatus.NotUploaded }
      }))
  }

  return (
    <div>
      <Button onClick={handleUploadFiles}>Upload</Button>
    </div>
  )
}
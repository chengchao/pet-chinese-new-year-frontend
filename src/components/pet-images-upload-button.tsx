"use client"

import React from "react"
import getOssClient from "./aliyun_oss_client"
import { Button } from "./ui/button"
import { usePetImages } from "./use-pet-images"
import * as Utils from "@/lib/utils"
import OSS from "ali-oss"
import { useToast } from "./ui/use-toast"

interface PetImagesUploadButtonProps {
  imagePrefix: string
  onUploadFinish: () => void
}

export default function PetImagesUploadButton({ imagePrefix, onUploadFinish }: PetImagesUploadButtonProps) {
  const { toast } = useToast()
  const [images,] = usePetImages()
  const [ossClient, setOssClient] = React.useState<OSS | null>(null);

  async function handleSaveFiles() {
    let newClient = ossClient
    if (newClient === null) {
      newClient = await getOssClient()
      setOssClient(newClient)
    }

    await Promise.all(images
      .map(async (image) => {
        newClient = Utils.assertValid(newClient)
        const imageFile = Utils.assertValid(image.file)
        const { name, res } = await newClient.put(`${imagePrefix}${imageFile.name}`, imageFile);
        if (res.status === 200) {
          console.log(`Upload Succeed. Name: ${name}`);
        }
      }))
    toast({
      title: "Upload Succeed",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(images.map((image) => image.file?.name), null, 2)}</code>
        </pre>
      ),
    })
    onUploadFinish()
  }

  return <Button onClick={handleSaveFiles}>Upload</Button>
}
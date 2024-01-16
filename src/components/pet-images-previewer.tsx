import { ImageListType } from "react-images-uploading"
import getOssClient from "./aliyun_oss_client"

interface PetImagesPreviewerProps {
  imagePrefix: string
}

export default function PetImagesPreviewer({ imagePrefix }: PetImagesPreviewerProps) {
  async function handleLoadImage() {
    const ossClient = await getOssClient()

    const { objects, res } = await ossClient.listV2({ prefix: imagePrefix }, {})
    if (res.status === 200) {
      const images: ImageListType = objects.map((obj) => {
        const signUrl = ossClient.signatureUrl(obj.name, { expires: 600 })
        console.log(`SignUrl: ${signUrl}`)
        return { data_url: signUrl, name: obj.name.substring(imagePrefix.length) }
      })
    }
  }

  return (
    <>

    </>
  )
}
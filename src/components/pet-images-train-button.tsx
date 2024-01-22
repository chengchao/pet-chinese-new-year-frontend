"use client"

import Link from "next/link"
import { Button } from "./ui/button"

interface PetImagesTrainButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  imagePrefix: string
}

export default function PetImagesTrainButton({ imagePrefix, className, ...props }: PetImagesTrainButtonProps) {
  return (
    <div className={className} {...props}>
      <Link href={`/pet/training/${imagePrefix}`}>
        <Button>{props.children}</Button>
      </Link>
    </div >
  )
}
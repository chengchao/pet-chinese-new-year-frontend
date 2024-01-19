import { Button } from "./ui/button"

interface PetImagesTrainButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  imagePrefix: string
}

export default function PetImagesTrainButton({ imagePrefix, className, ...props }: PetImagesTrainButtonProps) {
  return (
    <div className={className} {...props}>
      <Button>Train</Button>
    </div >
  )
}
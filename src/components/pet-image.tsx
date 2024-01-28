import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImageType } from "react-images-uploading";

type PetImageCardProp = {
  image: ImageType;
  width: number;
  height: number;
  children?: React.ReactNode;
};

export default function PetImage({
  image,
  width,
  height,
  children,
}: PetImageCardProp) {
  return (
    <div className="space-y-2 w-[110px] relative overflow-hidden rounded-md">
      <Image
        src={image["data_url"]}
        alt={image.file?.name ?? ""}
        width={width}
        height={height}
        className={cn(
          "z-0 h-auto w-auto object-cover transition-all hover:scale-105",
          "aspect-square"
        )}
      />
      {children}
    </div>
  );
}

import { Button } from "./ui/button";

type PetImageRemoveButtonProp = {
  index: number;
  onImageRemove: (index: number) => void;
};

export default function PetImageRemoveButton({
  index,
  onImageRemove,
}: PetImageRemoveButtonProp) {
  return (
    <div className="h-12">
      <div className="flex flex-col space-y-2">
        <Button onClick={() => onImageRemove(index)}>Remove</Button>
      </div>
    </div>
  );
}

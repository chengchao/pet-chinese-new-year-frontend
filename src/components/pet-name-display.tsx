type PetNameDisplayProp = {
  petSpecies: string;
  petName: string;
};

export function PetNameDisplay({ petSpecies, petName }: PetNameDisplayProp) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <h3 className="text-2xl font-semibold tracking-tight">
        {`${petSpecies}/${petName}`}
      </h3>
    </div>
  );
}

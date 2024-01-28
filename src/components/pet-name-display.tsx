type PetNameDisplayProp = {
  petSpecies: string
  petName: string
}

export function PetNameDisplay({ petSpecies, petName }: PetNameDisplayProp) {
  return <div className="flex items-center justify-between mt-6">
    <h3 className="text-2xl font-semibold tracking-tight">
      {`${petSpecies}/${petName}`}
    </h3>
  </div>
}
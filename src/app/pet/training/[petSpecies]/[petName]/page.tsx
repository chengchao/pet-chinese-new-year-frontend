export default async function Page({ params }: { params: { petSpecies: string, petName: string } }) {
  // check if there is already a training job running
  // if yes, show progress
  // if no, start a training job
  return (
    <div className="container">
      <div className="flex justify-around h-screen">
        <div className="flex flex-col justify-around">
          {/* client component to show progress */}
        </div>
      </div>
    </div>
  )
}
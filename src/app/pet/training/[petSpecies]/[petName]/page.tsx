export default async function Page() {
  // check if there is already a training job running
  // if yes, show progress
  // if no, start a training job
  return (
    <div className="container">
      <div className="flex h-screen justify-around">
        <div className="flex flex-col justify-around">
          {/* client component to show progress */}
        </div>
      </div>
    </div>
  );
}

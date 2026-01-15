export default function RestroomDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Restroom Details</h1>
      <p>Details for restroom ID: {params.id}</p>
    </div>
  );
}

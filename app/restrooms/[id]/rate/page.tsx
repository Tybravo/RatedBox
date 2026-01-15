export default function RateRestroomPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Rate Restroom</h1>
      <p>Rating form for restroom ID: {params.id}</p>
    </div>
  );
}

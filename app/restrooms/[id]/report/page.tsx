export default function ReportRestroomPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Report Issue</h1>
      <p>Report issue form for restroom ID: {params.id}</p>
    </div>
  );
}

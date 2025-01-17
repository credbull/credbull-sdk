export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="mt-6 bg-red-200 text-red-900 p-4 rounded-lg">
      <h3 className="text-lg font-bold">Error:</h3>
      <p>{message}</p>
    </div>
  );
}

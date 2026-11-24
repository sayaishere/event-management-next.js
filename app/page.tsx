import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-red-600 font-bold text-3xl mb-4">Event Management System</h1>
      <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded font-bold">
        View Events
      </Link>
    </div>
  );
}
import { getIsAdmin } from "@/db/queries";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const AdminPage = async () => {
  const { userId } = await auth();
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">
        The full admin interface is currently unavailable. Please use the API directly or contact the development team for assistance.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link 
          href="/learn"
          className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition"
        >
          <h2 className="text-lg font-semibold">Return to Learn Page</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Go back to the main application</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;

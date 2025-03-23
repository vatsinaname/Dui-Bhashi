import { getIsAdmin } from "@/db/queries";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import AdminClient from "./_components/admin-client";

const AdminPage = async () => {
  const { userId } = await auth();
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <AdminClient />;
};

export default AdminPage;

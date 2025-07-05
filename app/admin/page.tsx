import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import Dashboard from "@/components/admin/dashboard/Dashboard";

export default function AdminDashboard() {
  const { sessionClaims } = auth();

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  // if (!checkRole("admin")) {
  //   redirect("/");
  // }

  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}

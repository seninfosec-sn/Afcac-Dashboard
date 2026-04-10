import { getDashboardData, getUsers } from "@/lib/data";
import { getServerSession } from "@/lib/auth";
import AdminClient from "@/components/AdminClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [session, data] = await Promise.all([
    getServerSession(),
    Promise.resolve(getDashboardData()),
  ]);

  if (!session) redirect("/login");

  const users = session.role === "admin" ? getUsers().filter((u) => u.role === "expert") : [];

  return <AdminClient initialData={data} username={session.username} role={session.role} users={users} />;
}

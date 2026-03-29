import { getDashboardData } from "@/lib/data";
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

  return <AdminClient initialData={data} username={session.username} />;
}

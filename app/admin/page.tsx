import { getDashboardData, getUsers, findUser, getCountryTargets } from "@/lib/data";
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

  // Experts load their own country's targets (not the global aggregate)
  let initialData = data;
  if (session.role === "expert") {
    const user = findUser(session.username);
    if (user?.country) {
      initialData = { ...data, targets: getCountryTargets(user.country) };
    }
  }

  const users = session.role === "admin" ? getUsers().filter((u) => u.role === "expert") : [];

  return <AdminClient initialData={initialData} username={session.username} role={session.role} users={users} />;
}

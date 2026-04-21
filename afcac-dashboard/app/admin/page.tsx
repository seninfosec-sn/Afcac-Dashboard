import { getDashboardData, getUsers, findUser, getCountryTargets } from "@/lib/data";
import { getServerSession } from "@/lib/auth";
import AdminClient from "@/components/AdminClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [session, data] = await Promise.all([
    getServerSession(),
    getDashboardData(),
  ]);

  if (!session) redirect("/login");

  // Experts load their own country's targets (not the global aggregate)
  let initialData = data;
  if (session.role === "expert") {
    const user = await findUser(session.username);
    if (user?.country) {
      initialData = { ...data, targets: await getCountryTargets(user.country) };
    }
  }

  const currentUser = await findUser(session.username);
  const displayName = currentUser?.displayName ?? session.username;
  const allUsers = await getUsers();
  const users = session.role === "admin" ? allUsers.filter((u) => u.role === "expert") : [];

  return <AdminClient initialData={initialData} username={displayName} role={session.role} users={users} />;
}

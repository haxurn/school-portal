import { createClient } from "@/lib/supabase/server"
import { RoleManagement } from "@/components/admin/role-management"

export default async function RolesPage() {
  const supabase = createClient()

  // Fetch all roles
  const { data: roles } = await supabase.from("roles").select("*").order("id", { ascending: true })

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
        <p className="text-muted-foreground">Manage user roles and permissions for the school portal.</p>
      </div>

      <RoleManagement initialRoles={roles || []} />
    </div>
  )
}

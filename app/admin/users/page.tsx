import { createClient } from "@/lib/supabase/server"
import { UserManagement } from "@/components/admin/user-management"

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { filter?: string; page?: string; search?: string }
}) {
  const supabase = createClient()
  const filter = searchParams.filter || "all"
  const page = Number.parseInt(searchParams.page || "1")
  const search = searchParams.search || ""
  const pageSize = 10

  // Build the query
  let query = supabase.from("profiles").select(
    `
      *,
      roles(id, name)
    `,
    { count: "exact" },
  )

  // Apply filters
  if (filter === "pending") {
    query = query.eq("status", "pending")
  } else if (filter === "active") {
    query = query.eq("status", "active")
  } else if (filter === "suspended") {
    query = query.eq("status", "suspended")
  }

  // Apply search
  if (search) {
    query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  // Fetch users with pagination
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const { data: users, count } = await query.range(from, to).order("created_at", { ascending: false })

  // Fetch roles for dropdown
  const { data: roles } = await supabase.from("roles").select("id, name")

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts, approve registrations, and assign roles.</p>
      </div>

      <UserManagement
        initialUsers={users || []}
        totalUsers={count || 0}
        roles={roles || []}
        currentFilter={filter}
        currentPage={page}
        currentSearch={search}
        pageSize={pageSize}
      />
    </div>
  )
}

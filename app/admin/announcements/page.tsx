import { createClient } from "@/lib/supabase/server"
import { AnnouncementManagement } from "@/components/admin/announcement-management"

export default async function AnnouncementsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string }
}) {
  const supabase = createClient()
  const page = Number.parseInt(searchParams.page || "1")
  const search = searchParams.search || ""
  const pageSize = 10

  // Build the query
  let query = supabase.from("announcements").select(
    `
      *,
      profiles(first_name, last_name)
    `,
    { count: "exact" },
  )

  // Apply search
  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
  }

  // Fetch announcements with pagination
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const { data: announcements, count } = await query.range(from, to).order("published_at", { ascending: false })

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground">Create, edit, and manage school announcements.</p>
      </div>

      <AnnouncementManagement
        initialAnnouncements={announcements || []}
        totalAnnouncements={count || 0}
        currentPage={page}
        currentSearch={search}
        pageSize={pageSize}
      />
    </div>
  )
}

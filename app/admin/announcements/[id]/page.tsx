import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AnnouncementEditor } from "@/components/admin/announcement-editor"

export default async function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  // Fetch the announcement
  const { data: announcement, error } = await supabase.from("announcements").select("*").eq("id", params.id).single()

  if (error || !announcement) {
    notFound()
  }

  // Get user roles for targeting
  const { data: roles } = await supabase.from("roles").select("id, name")

  // Get announcement target roles
  const { data: targetRoles } = await supabase
    .from("announcement_targets")
    .select("role_id")
    .eq("announcement_id", announcement.id)

  const targetRoleIds = targetRoles?.map((target) => target.role_id) || []

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Announcement</h1>
        <p className="text-muted-foreground">Update an existing announcement for the school community.</p>
      </div>

      <AnnouncementEditor announcement={announcement} roles={roles || []} targetRoleIds={targetRoleIds} />
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import { AnnouncementEditor } from "@/components/admin/announcement-editor"

export default async function NewAnnouncementPage() {
  const supabase = createClient()

  // Get user roles for targeting
  const { data: roles } = await supabase.from("roles").select("id, name")

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Announcement</h1>
        <p className="text-muted-foreground">Create a new announcement to share with the school community.</p>
      </div>

      <AnnouncementEditor roles={roles || []} />
    </div>
  )
}

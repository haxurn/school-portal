import { createClient } from "@/lib/supabase/server"
import { PageManagement } from "@/components/admin/page-management"

export default async function PagesPage() {
  const supabase = createClient()

  // Fetch all editable pages
  const { data: pages } = await supabase.from("pages").select("*").order("title", { ascending: true })

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Page Editor</h1>
        <p className="text-muted-foreground">Edit website pages without modifying code.</p>
      </div>

      <PageManagement initialPages={pages || []} />
    </div>
  )
}

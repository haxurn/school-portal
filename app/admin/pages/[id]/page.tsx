import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PageEditor } from "@/components/admin/page-editor"

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  // Fetch the page
  const { data: page, error } = await supabase.from("pages").select("*").eq("id", params.id).single()

  if (error || !page) {
    notFound()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Page: {page.title}</h1>
        <p className="text-muted-foreground">Update the content and metadata for this page.</p>
      </div>

      <PageEditor page={page} />
    </div>
  )
}

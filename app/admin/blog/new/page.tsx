import { createClient } from "@/lib/supabase/server"
import { BlogPostEditor } from "@/components/admin/blog-post-editor"

export default async function NewBlogPostPage() {
  const supabase = createClient()

  // Fetch categories
  const { data: categories } = await supabase.from("blog_categories").select("*")

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Blog Post</h1>
        <p className="text-muted-foreground">Create a new blog post for the school website.</p>
      </div>

      <BlogPostEditor categories={categories || []} />
    </div>
  )
}

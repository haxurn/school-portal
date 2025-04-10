import { createClient } from "@/lib/supabase/server"
import { BlogPostManagement } from "@/components/admin/blog-post-management"

export default async function BlogPostsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string }
}) {
  const supabase = createClient()
  const page = Number.parseInt(searchParams.page || "1")
  const search = searchParams.search || ""
  const pageSize = 10

  // Build the query
  let query = supabase.from("blog_posts").select(
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

  // Fetch blog posts with pagination
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const { data: posts, count } = await query.range(from, to).order("created_at", { ascending: false })

  // Fetch categories
  const { data: categories } = await supabase.from("blog_categories").select("*")

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
        <p className="text-muted-foreground">Create, edit, and manage blog posts for the school website.</p>
      </div>

      <BlogPostManagement
        initialPosts={posts || []}
        totalPosts={count || 0}
        categories={categories || []}
        currentPage={page}
        currentSearch={search}
        pageSize={pageSize}
      />
    </div>
  )
}

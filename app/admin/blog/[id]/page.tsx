import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BlogPostEditor } from "@/components/admin/blog-post-editor"

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  // Fetch the blog post
  const { data: post, error } = await supabase.from("blog_posts").select("*").eq("id", params.id).single()

  if (error || !post) {
    notFound()
  }

  // Fetch categories
  const { data: categories } = await supabase.from("blog_categories").select("*")

  // Fetch post categories
  const { data: postCategories } = await supabase
    .from("blog_post_categories")
    .select("category_id")
    .eq("post_id", post.id)

  const categoryIds = postCategories?.map((pc) => pc.category_id) || []

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
        <p className="text-muted-foreground">Update an existing blog post for the school website.</p>
      </div>

      <BlogPostEditor post={post} categories={categories || []} selectedCategoryIds={categoryIds} />
    </div>
  )
}

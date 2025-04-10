"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Calendar, ImageIcon, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Category {
  id: number
  name: string
  slug: string
}

interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image: string | null
  author_id: string | null
  status: string
  created_at: string
  updated_at: string
  published_at: string | null
}

interface BlogPostEditorProps {
  post?: BlogPost
  categories: Category[]
  selectedCategoryIds?: number[]
}

export function BlogPostEditor({ post, categories, selectedCategoryIds = [] }: BlogPostEditorProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [content, setContent] = useState(post?.content || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "")
  const [status, setStatus] = useState(post?.status || "draft")
  const [publishDate, setPublishDate] = useState(
    post?.published_at
      ? new Date(post.published_at).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  )
  const [selectedCategories, setSelectedCategories] = useState<number[]>(selectedCategoryIds)
  const [isLoading, setIsLoading] = useState(false)
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const isEditing = !!post

  const generateSlug = () => {
    if (!title) return

    setIsGeneratingSlug(true)
    const newSlug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    setSlug(newSlug)
    setIsGeneratingSlug(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = await supabase.auth.getUser()
      const userId = user.data.user?.id

      const postData = {
        title,
        slug,
        content,
        excerpt,
        featured_image: featuredImage,
        author_id: userId,
        status,
        updated_at: new Date().toISOString(),
        published_at: status === "published" ? new Date(publishDate).toISOString() : null,
      }

      let postId: number

      if (isEditing) {
        // Update existing post
        const { error } = await supabase.from("blog_posts").update(postData).eq("id", post.id)

        if (error) throw error

        postId = post.id

        // Delete existing category relationships
        await supabase.from("blog_post_categories").delete().eq("post_id", post.id)
      } else {
        // Create new post
        const { data, error } = await supabase
          .from("blog_posts")
          .insert({
            ...postData,
            created_at: new Date().toISOString(),
          })
          .select()

        if (error) throw error

        postId = data[0].id
      }

      // Add category relationships
      if (selectedCategories.length > 0) {
        const categoryData = selectedCategories.map((categoryId) => ({
          post_id: postId,
          category_id: categoryId,
        }))

        const { error: categoryError } = await supabase.from("blog_post_categories").insert(categoryData)

        if (categoryError) throw categoryError
      }

      // Log activity
      await supabase.from("admin_activities").insert({
        user_id: userId,
        user_name: "Administrator",
        action: isEditing ? `Updated blog post: ${title}` : `Created blog post: ${title}`,
      })

      toast({
        title: isEditing ? "Blog post updated" : "Blog post created",
        description: isEditing
          ? "The blog post has been updated successfully."
          : "The blog post has been created successfully.",
      })

      router.push("/admin/blog")
      router.refresh()
    } catch (error: any) {
      toast({
        title: isEditing ? "Error updating blog post" : "Error creating blog post",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Blog post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="slug">Slug</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateSlug}
              disabled={!title || isGeneratingSlug}
            >
              {isGeneratingSlug ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate from Title"
              )}
            </Button>
          </div>
          <Input
            id="slug"
            placeholder="blog-post-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">This will be used in the URL: /blog/{slug || "example-slug"}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Blog post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            placeholder="A short summary of the blog post"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground">This will be displayed in blog listings and search results.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="featuredImage">Featured Image URL</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="featuredImage"
                placeholder="https://example.com/image.jpg"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="pl-10"
              />
            </div>
            {featuredImage && (
              <Button type="button" variant="outline" size="icon" onClick={() => window.open(featuredImage, "_blank")}>
                <Eye className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Enter the URL of the featured image for this blog post.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {status === "published" && (
            <div className="space-y-2">
              <Label htmlFor="publishDate">Publish Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="publishDate"
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="pl-10"
                  required={status === "published"}
                />
              </div>
            </div>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Select which categories this blog post belongs to.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([...selectedCategories, category.id])
                      } else {
                        setSelectedCategories(selectedCategories.filter((id) => id !== category.id))
                      }
                    }}
                  />
                  <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : isEditing ? (
              "Update Blog Post"
            ) : (
              "Create Blog Post"
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}

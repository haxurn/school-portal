"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface Page {
  id: number
  title: string
  slug: string
  content: string
  meta_description: string | null
  last_updated: string
}

interface PageEditorProps {
  page: Page
}

export function PageEditor({ page }: PageEditorProps) {
  const [title, setTitle] = useState(page.title)
  const [content, setContent] = useState(page.content)
  const [metaDescription, setMetaDescription] = useState(page.meta_description || "")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from("pages")
        .update({
          title,
          content,
          meta_description: metaDescription,
          last_updated: new Date().toISOString(),
        })
        .eq("id", page.id)

      if (error) throw error

      // Log activity
      await supabase.from("admin_activities").insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        user_name: "Administrator",
        action: `Updated page: ${title}`,
      })

      toast({
        title: "Page updated",
        description: "The page has been updated successfully.",
      })

      router.push("/admin/pages")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error updating page",
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
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" value={page.slug} disabled className="bg-muted" />
          <p className="text-xs text-muted-foreground">The slug cannot be changed as it would break existing links.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px] font-mono"
            required
          />
          <p className="text-xs text-muted-foreground">
            You can use HTML to format the content. Be careful not to break the page structure.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground">
            This description will be used for SEO purposes and will appear in search engine results.
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/pages")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Page"
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}

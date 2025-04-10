"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface Role {
  id: number
  name: string
}

interface Announcement {
  id: number
  title: string
  content: string
  author_id: string | null
  published_at: string
  created_at: string
  updated_at: string
}

interface AnnouncementEditorProps {
  announcement?: Announcement
  roles: Role[]
  targetRoleIds?: number[]
}

export function AnnouncementEditor({ announcement, roles, targetRoleIds = [] }: AnnouncementEditorProps) {
  const [title, setTitle] = useState(announcement?.title || "")
  const [content, setContent] = useState(announcement?.content || "")
  const [publishDate, setPublishDate] = useState(
    announcement
      ? new Date(announcement.published_at).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  )
  const [selectedRoles, setSelectedRoles] = useState<number[]>(targetRoleIds)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const isEditing = !!announcement

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = await supabase.auth.getUser()
      const userId = user.data.user?.id

      const announcementData = {
        title,
        content,
        author_id: userId,
        published_at: new Date(publishDate).toISOString(),
        updated_at: new Date().toISOString(),
      }

      let announcementId: number

      if (isEditing) {
        // Update existing announcement
        const { error } = await supabase.from("announcements").update(announcementData).eq("id", announcement.id)

        if (error) throw error

        announcementId = announcement.id

        // Delete existing targets
        await supabase.from("announcement_targets").delete().eq("announcement_id", announcement.id)
      } else {
        // Create new announcement
        const { data, error } = await supabase.from("announcements").insert(announcementData).select()

        if (error) throw error

        announcementId = data[0].id
      }

      // Add target roles if any are selected
      if (selectedRoles.length > 0) {
        const targetData = selectedRoles.map((roleId) => ({
          announcement_id: announcementId,
          role_id: roleId,
        }))

        const { error: targetError } = await supabase.from("announcement_targets").insert(targetData)

        if (targetError) throw targetError
      }

      // Log activity
      await supabase.from("admin_activities").insert({
        user_id: userId,
        user_name: "Administrator",
        action: isEditing ? `Updated announcement: ${title}` : `Created announcement: ${title}`,
      })

      toast({
        title: isEditing ? "Announcement updated" : "Announcement created",
        description: isEditing
          ? "The announcement has been updated successfully."
          : "The announcement has been created successfully.",
      })

      router.push("/admin/announcements")
      router.refresh()
    } catch (error: any) {
      toast({
        title: isEditing ? "Error updating announcement" : "Error creating announcement",
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
            placeholder="Announcement title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Announcement content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px]"
            required
          />
        </div>

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
              required
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Target Audience</CardTitle>
            <CardDescription>
              Select which user roles should see this announcement. If none are selected, all users will see it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {roles.map((role) => (
                <div key={role.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`role-${role.id}`}
                    checked={selectedRoles.includes(role.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRoles([...selectedRoles, role.id])
                      } else {
                        setSelectedRoles(selectedRoles.filter((id) => id !== role.id))
                      }
                    }}
                  />
                  <Label htmlFor={`role-${role.id}`} className="capitalize">
                    {role.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/announcements")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : isEditing ? (
              "Update Announcement"
            ) : (
              "Create Announcement"
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}

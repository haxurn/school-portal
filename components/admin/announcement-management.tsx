"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Search, Plus, Edit, Trash2, MoreHorizontal, Loader2, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface Author {
  first_name: string | null
  last_name: string | null
}

interface Announcement {
  id: number
  title: string
  content: string
  author_id: string | null
  published_at: string
  created_at: string
  updated_at: string
  profiles: Author | null
}

interface AnnouncementManagementProps {
  initialAnnouncements: Announcement[]
  totalAnnouncements: number
  currentPage: number
  currentSearch: string
  pageSize: number
}

export function AnnouncementManagement({
  initialAnnouncements,
  totalAnnouncements,
  currentPage,
  currentSearch,
  pageSize,
}: AnnouncementManagementProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements)
  const [page, setPage] = useState(currentPage)
  const [search, setSearch] = useState(currentSearch)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const totalPages = Math.ceil(totalAnnouncements / pageSize)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/admin/announcements?search=${search}&page=1`)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    router.push(`/admin/announcements?search=${search}&page=${newPage}`)
  }

  const openDeleteDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setShowDeleteDialog(true)
  }

  const closeDeleteDialog = () => {
    setSelectedAnnouncement(null)
    setShowDeleteDialog(false)
  }

  const handleDeleteAnnouncement = async () => {
    if (!selectedAnnouncement) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("announcements").delete().eq("id", selectedAnnouncement.id)

      if (error) throw error

      // Log activity
      await supabase.from("admin_activities").insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        user_name: "Administrator",
        action: `Deleted announcement: ${selectedAnnouncement.title}`,
      })

      toast({
        title: "Announcement deleted",
        description: "The announcement has been deleted successfully.",
      })

      // Update local state
      setAnnouncements(announcements.filter((a) => a.id !== selectedAnnouncement.id))

      closeDeleteDialog()
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error deleting announcement",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        <Button asChild>
          <Link href="/admin/announcements/new">
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No announcements found.
                </TableCell>
              </TableRow>
            ) : (
              announcements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell className="font-medium">{announcement.title}</TableCell>
                  <TableCell>
                    {announcement.profiles
                      ? `${announcement.profiles.first_name || ""} ${announcement.profiles.last_name || ""}`.trim()
                      : "System"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {new Date(announcement.published_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/announcements/${announcement.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => openDeleteDialog(announcement)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </div>
          <Button variant="outline" size="sm" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}

      {/* Delete Announcement Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Announcement</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this announcement? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm font-medium">Announcement:</p>
            <p className="text-sm">{selectedAnnouncement?.title}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAnnouncement} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

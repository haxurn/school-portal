"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Calendar, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Author {
  first_name: string | null
  last_name: string | null
  role_id: number | null
  roles: {
    name: string
  } | null
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

interface AnnouncementsListProps {
  initialAnnouncements: Announcement[]
}

export function AnnouncementsList({ initialAnnouncements }: AnnouncementsListProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements)
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState("all")
  const [authorFilter, setAuthorFilter] = useState("all")
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>(initialAnnouncements)

  // Get unique authors for filter dropdown
  const authors = Array.from(
    new Set(
      initialAnnouncements
        .filter((a) => a.profiles)
        .map((a) => `${a.profiles?.first_name || ""} ${a.profiles?.last_name || ""}`.trim()),
    ),
  )

  // Apply filters and search
  useEffect(() => {
    let filtered = [...initialAnnouncements]

    // Apply time filter
    if (timeFilter !== "all") {
      const now = new Date()
      if (timeFilter === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        filtered = filtered.filter((a) => new Date(a.published_at) >= weekAgo)
      } else if (timeFilter === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        filtered = filtered.filter((a) => new Date(a.published_at) >= monthAgo)
      } else if (timeFilter === "year") {
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        filtered = filtered.filter((a) => new Date(a.published_at) >= yearAgo)
      }
    }

    // Apply author filter
    if (authorFilter !== "all") {
      filtered = filtered.filter(
        (a) => `${a.profiles?.first_name || ""} ${a.profiles?.last_name || ""}`.trim() === authorFilter,
      )
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (a) => a.title.toLowerCase().includes(query) || a.content.toLowerCase().includes(query),
      )
    }

    setFilteredAnnouncements(filtered)
  }, [initialAnnouncements, searchQuery, timeFilter, authorFilter])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search announcements..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="year">Past Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={authorFilter} onValueChange={setAuthorFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {authors.map((author) => (
                  <SelectItem key={author} value={author}>
                    {author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <AnnouncementsGrid announcements={filteredAnnouncements} />
        </TabsContent>
        <TabsContent value="events" className="mt-6">
          <AnnouncementsGrid
            announcements={filteredAnnouncements.filter(
              (a) => a.title.toLowerCase().includes("event") || a.title.toLowerCase().includes("day"),
            )}
          />
        </TabsContent>
        <TabsContent value="academic" className="mt-6">
          <AnnouncementsGrid
            announcements={filteredAnnouncements.filter(
              (a) =>
                a.title.toLowerCase().includes("academic") ||
                a.title.toLowerCase().includes("exam") ||
                a.title.toLowerCase().includes("class") ||
                a.title.toLowerCase().includes("course"),
            )}
          />
        </TabsContent>
        <TabsContent value="general" className="mt-6">
          <AnnouncementsGrid
            announcements={filteredAnnouncements.filter(
              (a) =>
                !a.title.toLowerCase().includes("event") &&
                !a.title.toLowerCase().includes("day") &&
                !a.title.toLowerCase().includes("academic") &&
                !a.title.toLowerCase().includes("exam") &&
                !a.title.toLowerCase().includes("class") &&
                !a.title.toLowerCase().includes("course"),
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AnnouncementsGrid({ announcements }: { announcements: Announcement[] }) {
  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No announcements found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  )
}

function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  // Determine category based on title keywords
  let category = "General"
  const title = announcement.title.toLowerCase()
  if (title.includes("event") || title.includes("day")) {
    category = "Event"
  } else if (
    title.includes("academic") ||
    title.includes("exam") ||
    title.includes("class") ||
    title.includes("course")
  ) {
    category = "Academic"
  }

  // Format date
  const formattedDate = format(new Date(announcement.published_at), "MMMM d, yyyy")

  // Get author name
  const authorName = announcement.profiles
    ? `${announcement.profiles.first_name || ""} ${announcement.profiles.last_name || ""}`.trim()
    : "School Administration"

  // Get author role
  const authorRole = announcement.profiles?.roles?.name || "Staff"

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-2">{announcement.title}</CardTitle>
          <Badge variant={category === "Event" ? "default" : category === "Academic" ? "secondary" : "outline"}>
            {category}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 pt-1">
          <Calendar className="h-3 w-3" />
          <span>{formattedDate}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-4 text-sm text-muted-foreground">{announcement.content}</p>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">{authorName}</span>
            <span> · </span>
            <span>{authorRole}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            Read More
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

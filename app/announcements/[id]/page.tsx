import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default async function AnnouncementPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  // Fetch the announcement with author information
  const { data: announcement, error } = await supabase
    .from("announcements")
    .select(`
      *,
      profiles(first_name, last_name, role_id, roles(name))
    `)
    .eq("id", params.id)
    .single()

  if (error || !announcement) {
    notFound()
  }

  // Fetch related announcements
  const { data: relatedAnnouncements } = await supabase
    .from("announcements")
    .select(`
      id,
      title,
      published_at
    `)
    .neq("id", announcement.id)
    .order("published_at", { ascending: false })
    .limit(5)

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
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/announcements" className="flex items-center">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Announcements
                    </Link>
                  </Button>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={category === "Event" ? "default" : category === "Academic" ? "secondary" : "outline"}
                      >
                        {category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {formattedDate}
                      </div>
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{announcement.title}</h1>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <span>Posted by </span>
                      <span className="ml-1 font-medium">{authorName}</span>
                      <span className="mx-1">·</span>
                      <span>{authorRole}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="prose prose-stone dark:prose-invert max-w-none">
                    {announcement.content.split("\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Other Announcements</h2>
                    <div className="space-y-2">
                      {relatedAnnouncements?.map((related) => (
                        <Card key={related.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <Link
                                href={`/announcements/${related.id}`}
                                className="font-medium hover:text-primary hover:underline"
                              >
                                {related.title}
                              </Link>
                              <span className="text-sm text-muted-foreground">
                                {format(new Date(related.published_at), "MMM d, yyyy")}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <SiteFooter />
    </div>
  )
}

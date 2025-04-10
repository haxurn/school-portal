import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"
import { AnnouncementsList } from "@/components/announcements/announcements-list"

export default async function AnnouncementsPage() {
  const supabase = createClient()

  // Fetch all announcements with author information
  const { data: announcements } = await supabase
    .from("announcements")
    .select(`
      *,
      profiles(first_name, last_name, role_id, roles(name))
    `)
    .order("published_at", { ascending: false })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">School Announcements</h1>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                    Stay updated with the latest news, events, and important information from Vision Academy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
              <AnnouncementsList initialAnnouncements={announcements || []} />
            </div>
          </section>
        </main>
      </PageTransition>
      <SiteFooter />
    </div>
  )
}

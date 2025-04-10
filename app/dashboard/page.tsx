import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/page-transition"

export default async function DashboardPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth")
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select(`
      *,
      roles(name)
    `)
    .eq("id", session.user.id)
    .single()

  // Get announcements
  const { data: announcements } = await supabase
    .from("announcements")
    .select(`
      *,
      profiles(first_name, last_name)
    `)
    .order("published_at", { ascending: false })
    .limit(5)

  // Get classes (if student)
  const { data: classes } = await supabase
    .from("student_classes")
    .select(`
      classes(id, name, description, academic_year)
    `)
    .eq("student_id", session.user.id)

  const userRole = profile?.roles?.name || "student"
  const userName = `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() || "User"

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-start gap-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Welcome, {userName}</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  {userRole === "student"
                    ? "Access your classes, assignments, and school resources."
                    : userRole === "teacher"
                      ? "Manage your classes, students, and teaching resources."
                      : "Manage school resources, users, and announcements."}
                </p>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="classes">Classes</TabsTrigger>
                  <TabsTrigger value="announcements">Announcements</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Your personal information</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Name:</span>
                            <span>{userName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Email:</span>
                            <span>{profile?.email || session.user.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Role:</span>
                            <span className="capitalize">{userRole}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Quick Links</CardTitle>
                        <CardDescription>Frequently used resources</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="text-blue-600 hover:underline cursor-pointer">School Calendar</li>
                          <li className="text-blue-600 hover:underline cursor-pointer">Resource Library</li>
                          <li className="text-blue-600 hover:underline cursor-pointer">Contact Directory</li>
                          <li className="text-blue-600 hover:underline cursor-pointer">Help Center</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Upcoming Events</CardTitle>
                        <CardDescription>School events and activities</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Parent-Teacher Meeting</span>
                            <span className="text-sm text-muted-foreground">May 15</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Science Fair</span>
                            <span className="text-sm text-muted-foreground">May 22</span>
                          </li>
                          <li className="flex justify-between">
                            <span>End of Term Exams</span>
                            <span className="text-sm text-muted-foreground">June 10-15</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="classes" className="mt-6 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {classes && classes.length > 0 ? (
                      classes.map((classItem) => (
                        <Card key={classItem.classes?.id}>
                          <CardHeader>
                            <CardTitle>{classItem.classes?.name}</CardTitle>
                            <CardDescription>{classItem.classes?.academic_year}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {classItem.classes?.description || "No description available"}
                            </p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">No classes found. Please contact administration.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="announcements" className="mt-6 space-y-6">
                  <div className="space-y-4">
                    {announcements && announcements.length > 0 ? (
                      announcements.map((announcement) => (
                        <Card key={announcement.id}>
                          <CardHeader>
                            <CardTitle>{announcement.title}</CardTitle>
                            <CardDescription>
                              Posted by {announcement.profiles?.first_name} {announcement.profiles?.last_name} on{" "}
                              {new Date(announcement.published_at).toLocaleDateString()}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="whitespace-pre-line">{announcement.content}</p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No announcements available.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>
      </PageTransition>
      <SiteFooter />
    </div>
  )
}

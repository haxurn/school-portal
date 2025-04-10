import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Bell, Users, FileEdit } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = createClient()

  // Fetch counts for dashboard
  const [
    { count: pagesCount },
    { count: postsCount },
    { count: announcementsCount },
    { count: usersCount },
    { count: pendingUsersCount },
  ] = await Promise.all([
    supabase.from("pages").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("announcements").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ])

  // Fetch recent activities
  const { data: recentActivities } = await supabase
    .from("admin_activities")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Vision Academy admin dashboard. Manage your school portal from here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileEdit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagesCount || 0}</div>
            <p className="text-xs text-muted-foreground">Editable website pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postsCount || 0}</div>
            <p className="text-xs text-muted-foreground">Published blog articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcementsCount || 0}</div>
            <p className="text-xs text-muted-foreground">School announcements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount || 0}</div>
            <p className="text-xs text-muted-foreground">{pendingUsersCount || 0} pending approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions performed in the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivities && recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        By {activity.user_name} on {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent activities</p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <a
              href="/admin/users?filter=pending"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <Users className="h-4 w-4" />
              <span className="text-sm">Approve Pending Users</span>
            </a>
            <a
              href="/admin/announcements/new"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="text-sm">Create Announcement</span>
            </a>
            <a
              href="/admin/blog/new"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">Write Blog Post</span>
            </a>
            <a href="/admin/pages" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
              <FileEdit className="h-4 w-4" />
              <span className="text-sm">Edit Website Pages</span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

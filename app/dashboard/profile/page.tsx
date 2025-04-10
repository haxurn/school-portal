import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"
import { ProfileForm } from "@/components/dashboard/profile-form"

export default async function ProfilePage() {
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
      roles(id, name)
    `)
    .eq("id", session.user.id)
    .single()

  if (!profile) {
    // Create profile if it doesn't exist
    const { error } = await supabase.from("profiles").insert({
      id: session.user.id,
      email: session.user.email || "",
      role_id: 3, // Default to student role
    })

    if (error) {
      console.error("Error creating profile:", error)
    }

    // Refresh the page to get the new profile
    redirect("/dashboard/profile")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-start gap-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Profile</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Manage your personal information and account settings
                </p>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-2xl">
                <ProfileForm profile={profile} />
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <SiteFooter />
    </div>
  )
}

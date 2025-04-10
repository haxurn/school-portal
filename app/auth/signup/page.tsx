import { StudentSignupForm } from "@/components/auth/student-signup-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function StudentSignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container flex flex-col items-center justify-center px-4 md:px-6">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[450px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Student Registration</h1>
                <p className="text-sm text-muted-foreground">
                  Create an account to access the school portal. Your registration will need to be approved by an
                  administrator.
                </p>
              </div>
              <StudentSignupForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

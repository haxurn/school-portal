import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container flex flex-col items-center justify-center px-4 md:px-6">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Registration Pending Approval</CardTitle>
                <CardDescription className="text-center">
                  Your account has been created and is waiting for administrator approval.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>
                  Thank you for registering with Vision Academy. An administrator will review your registration and
                  approve your account. You will receive an email notification once your account has been approved.
                </p>
                <p className="mt-4">If you have any questions, please contact the school administration.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild variant="outline">
                  <Link href="/auth">Return to login</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

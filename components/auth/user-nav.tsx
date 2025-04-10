"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function UserNav() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)

      // Set up auth state listener
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => {
        authListener.subscription.unsubscribe()
      }
    }

    getSession()
  }, [supabase.auth])

  const handleSignOut = async () => {
    setLoading(true)

    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      })

      router.push("/")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    )
  }

  if (session) {
    return (
      <>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button onClick={handleSignOut} variant="outline" size="sm" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing out...
            </>
          ) : (
            "Sign out"
          )}
        </Button>
      </>
    )
  }

  return (
    <>
      <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
        <Link href="/auth">Log In</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth?tab=signup">Join Now</Link>
      </Button>
    </>
  )
}

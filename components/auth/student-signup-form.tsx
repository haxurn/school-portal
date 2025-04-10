"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function StudentSignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const schoolId = formData.get("schoolId") as string

    try {
      // Validate school ID
      const { data: validSchoolId, error: schoolIdError } = await supabase
        .from("school_ids")
        .select("*")
        .eq("id", schoolId)
        .single()

      if (schoolIdError || !validSchoolId) {
        throw new Error("Invalid school ID. Please check and try again.")
      }

      if (validSchoolId.is_used) {
        throw new Error("This school ID has already been used for registration.")
      }

      // Create user account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            school_id: schoolId,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        // Mark school ID as used
        await supabase.from("school_ids").update({ is_used: true, user_id: data.user.id }).eq("id", schoolId)

        // Create profile record
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: email,
          first_name: firstName,
          last_name: lastName,
          role_id: 3, // Student role
          status: "pending", // Pending approval
        })

        if (profileError) throw profileError

        // Log activity for admins
        await supabase.from("admin_activities").insert({
          user_id: null,
          user_name: "System",
          action: `New student registration: ${firstName} ${lastName} (${email})`,
        })
      }

      toast({
        title: "Registration successful",
        description: "Your account has been created and is pending approval by an administrator.",
      })

      router.push("/auth/pending-approval")
    } catch (error: any) {
      setError(error.message || "An error occurred during registration. Please try again.")
      toast({
        title: "Registration failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSignUp}>
        <CardHeader>
          <CardTitle>Student Registration</CardTitle>
          <CardDescription>Enter your details to create a student account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <div className="text-sm font-medium text-destructive">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schoolId">School ID</Label>
            <Input id="schoolId" name="schoolId" required />
            <p className="text-xs text-muted-foreground">Enter your school ID provided by the administration</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" name="password" type={showPassword ? "text" : "password"} required minLength={8} />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

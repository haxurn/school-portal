"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { LayoutDashboard, FileEdit, BookOpen, Bell, Users, UserCog, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      })
      router.push("/admin/login")
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    }
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/pages", label: "Page Editor", icon: FileEdit },
    { href: "/admin/blog", label: "Blog Posts", icon: BookOpen },
    { href: "/admin/announcements", label: "Announcements", icon: Bell },
    { href: "/admin/users", label: "User Management", icon: Users },
    { href: "/admin/roles", label: "Role Management", icon: UserCog },
    { href: "/admin/settings", label: "Site Settings", icon: Settings },
  ]

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <div className="font-bold text-xl">Admin Panel</div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:block bg-muted w-full md:w-64 md:min-h-screen p-4 border-r`}>
        <div className="hidden md:block font-bold text-xl mb-6">Admin Panel</div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted-foreground/10 text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            )
          })}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-muted-foreground/10 text-muted-foreground hover:text-foreground"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </nav>
      </div>
    </>
  )
}

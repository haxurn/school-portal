import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/auth/user-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold">
            Vision Academy
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary">
            About Us
          </Link>
          <Link href="/courses" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Courses
          </Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Blog
          </Link>
          <Link href="/gallery" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Gallery
          </Link>
          <Link href="/announcements" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Announcements
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

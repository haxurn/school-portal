import Link from "next/link"
import Image from "next/image"
import { Calendar, Search, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface BlogSidebarProps {
  categories: string[]
}

export function BlogSidebar({ categories }: BlogSidebarProps) {
  // Sample popular posts
  const popularPosts = [
    {
      id: 1,
      title: "New STEM Program Launches This Fall",
      date: "April 15, 2023",
      image: "/placeholder.svg?height=80&width=80&text=STEM",
      slug: "new-stem-program",
    },
    {
      id: 2,
      title: "Student Art Exhibition Opens Next Week",
      date: "April 10, 2023",
      image: "/placeholder.svg?height=80&width=80&text=Art",
      slug: "student-art-exhibition",
    },
    {
      id: 3,
      title: "Tips for Preparing for Final Exams",
      date: "April 5, 2023",
      image: "/placeholder.svg?height=80&width=80&text=Exams",
      slug: "final-exam-tips",
    },
  ]

  // Sample upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      date: "May 5, 2023",
      time: "3:00 PM - 7:00 PM",
    },
    {
      id: 2,
      title: "School Concert",
      date: "May 12, 2023",
      time: "6:30 PM - 8:30 PM",
    },
    {
      id: 3,
      title: "Sports Day",
      date: "May 20, 2023",
      time: "9:00 AM - 2:00 PM",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search blog posts..." className="pl-8" />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog/category/${category.toLowerCase()}`}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <Tag className="mr-1 h-3 w-3" />
              {category}
            </Link>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-medium">Popular Posts</h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="flex gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-md">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover transition-all group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h4 className="font-medium group-hover:text-primary">{post.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-medium">Upcoming Events</h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="space-y-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="text-xs text-muted-foreground">
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View All Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-medium">Subscribe</h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Get the latest posts delivered straight to your inbox.</p>
              <div className="space-y-2">
                <Input type="email" placeholder="Your email" />
                <Button className="w-full">Subscribe</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Calendar, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { BlogSidebar } from "@/components/blog-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function BlogPage() {
  // Sample blog posts data
  const posts = [
    {
      id: 1,
      title: "New STEM Program Launches This Fall",
      excerpt:
        "Our school is excited to announce a new comprehensive STEM program designed to prepare students for future careers in science, technology, engineering, and mathematics.",
      date: "April 15, 2023",
      author: "Dr. Jane Smith",
      image: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?q=80&w=1000",
      categories: ["Academics", "Announcements"],
      slug: "new-stem-program",
    },
    {
      id: 2,
      title: "Student Art Exhibition Opens Next Week",
      excerpt:
        "Join us for the annual student art exhibition showcasing incredible talent from students across all grade levels. The exhibition will be open to the public starting next Monday.",
      date: "April 10, 2023",
      author: "Mark Johnson",
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1000",
      categories: ["Events", "Student Life"],
      slug: "student-art-exhibition",
    },
    {
      id: 3,
      title: "Tips for Preparing for Final Exams",
      excerpt:
        "With final exams approaching, our academic counselors have put together a comprehensive guide to help students prepare effectively and manage stress during this busy time.",
      date: "April 5, 2023",
      author: "Sarah Williams",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000",
      categories: ["Academics", "Student Life"],
      slug: "final-exam-tips",
    },
    {
      id: 4,
      title: "Sports Team Wins Regional Championship",
      excerpt:
        "Congratulations to our varsity basketball team for winning the regional championship! The team showed incredible teamwork and perseverance throughout the season.",
      date: "March 28, 2023",
      author: "Coach Thompson",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000",
      categories: ["Sports", "Announcements"],
      slug: "sports-championship",
    },
    {
      id: 5,
      title: "Parent-Teacher Conference Schedule Released",
      excerpt:
        "The schedule for the upcoming parent-teacher conferences has been released. Please check the portal to book your preferred time slots with your child's teachers.",
      date: "March 20, 2023",
      author: "Principal Anderson",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000",
      categories: ["Events", "Announcements"],
      slug: "parent-teacher-conferences",
    },
    {
      id: 6,
      title: "New Library Resources Available Online",
      excerpt:
        "Our school library has expanded its digital collection with thousands of new e-books, research papers, and educational resources that students can access from anywhere.",
      date: "March 15, 2023",
      author: "Librarian Wilson",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000",
      categories: ["Resources", "Academics"],
      slug: "library-resources",
    },
  ]

  // All unique categories from posts
  const allCategories = [...new Set(posts.flatMap((post) => post.categories))].sort()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">School Blog</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Stay updated with the latest news, events, and insights from our school community.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search blog posts..." className="pl-8" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold tracking-tight">Latest Posts</h2>
                  <Separator className="flex-1" />
                </div>
                <div className="grid gap-8">
                  {posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                      <Card className="overflow-hidden transition-all hover:shadow-md">
                        <div className="md:grid md:grid-cols-[1fr_2fr] md:gap-4">
                          <div className="aspect-video w-full overflow-hidden md:aspect-square">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={`${post.title} thumbnail`}
                              width={400}
                              height={200}
                              className="h-full w-full object-cover transition-all group-hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-4 md:p-6">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.author}</span>
                              </div>
                              <h3 className="font-bold group-hover:text-primary">{post.title}</h3>
                              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                              <div className="flex flex-wrap items-center gap-2 pt-2">
                                {post.categories.map((category) => (
                                  <span
                                    key={category}
                                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                  >
                                    {category}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              </div>
              <BlogSidebar categories={allCategories} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, MessageSquare, Share2, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { User } from "lucide-react"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // This would normally come from a database or CMS
  const post = {
    title: "New STEM Program Launches This Fall",
    date: "April 15, 2023",
    author: "Dr. Jane Smith",
    authorRole: "Academic Director",
    content: `
    <p>We are excited to announce the launch of our new comprehensive STEM program this fall semester. This innovative program is designed to prepare students for future careers in science, technology, engineering, and mathematics through hands-on learning experiences and real-world applications.</p>
    
    <h2>Program Highlights</h2>
    
    <p>The new STEM program will feature:</p>
    
    <ul>
      <li>State-of-the-art laboratory facilities equipped with the latest technology</li>
      <li>Project-based learning that encourages critical thinking and problem-solving</li>
      <li>Partnerships with local tech companies and research institutions</li>
      <li>Guest lectures from industry professionals and academic experts</li>
      <li>Opportunities for internships and research projects</li>
    </ul>
    
    <p>Students enrolled in the program will have access to specialized courses in robotics, computer programming, environmental science, and advanced mathematics. The curriculum has been developed in consultation with industry leaders to ensure that students acquire the skills and knowledge that are in high demand in today's job market.</p>
    
    <h2>Why STEM Education Matters</h2>
    
    <p>STEM education is more important than ever in our rapidly evolving technological landscape. By fostering a strong foundation in these disciplines, we aim to equip our students with the tools they need to succeed in college and beyond. The program emphasizes not only technical skills but also creativity, collaboration, and communication—essential qualities for future innovators and leaders.</p>
    
    <p>We believe that every student should have the opportunity to explore STEM subjects in a supportive and engaging environment. Our program is designed to be inclusive and accessible to students with diverse interests and backgrounds.</p>
    
    <h2>Enrollment Information</h2>
    
    <p>Registration for the STEM program will open on May 1st. Space is limited, so we encourage interested students and parents to attend our upcoming information session on April 25th at 6:00 PM in the school auditorium.</p>
    
    <p>For more information, please contact the Academic Office or visit the STEM Program page on our school website.</p>
  `,
    image: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?q=80&w=1000",
    categories: ["Academics", "Announcements"],
    relatedPosts: [
      {
        id: 2,
        title: "Student Art Exhibition Opens Next Week",
        excerpt:
          "Join us for the annual student art exhibition showcasing incredible talent from students across all grade levels.",
        date: "April 10, 2023",
        image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1000",
        slug: "student-art-exhibition",
      },
      {
        id: 3,
        title: "Tips for Preparing for Final Exams",
        excerpt:
          "With final exams approaching, our academic counselors have put together a comprehensive guide to help students prepare effectively.",
        date: "April 5, 2023",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000",
        slug: "final-exam-tips",
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="container max-w-4xl py-12 md:py-16 lg:py-24">
          <div className="space-y-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
                <span>•</span>
                <span>By {post.author}</span>
                <div className="flex-1" />
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image src="/images/teacher-1.png" alt={post.author} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className="prose prose-stone mx-auto max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>5 Comments</span>
              </Button>
            </div>
            <Separator />
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Comments</h2>
              <div className="space-y-4">
                {/* Comment form */}
                <div className="flex gap-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <User className="h-full w-full p-2 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Textarea placeholder="Add a comment..." />
                    <div className="flex justify-end">
                      <Button>Post Comment</Button>
                    </div>
                  </div>
                </div>
                {/* Sample comments */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image src="/images/student-1.png" alt="Comment author" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                        <p className="text-sm">
                          This is fantastic news! My daughter is very interested in robotics and has been hoping for
                          more STEM opportunities. Will there be an after-school component to this program as well?
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-4 pl-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                        >
                          Like
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image src="/images/student-2.png" alt="Comment author" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="font-medium">Michael Chen</p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                        <p className="text-sm">
                          I'm excited to see the school investing in STEM education. Will there be any information
                          sessions specifically for parents who want to learn more about how they can support their
                          children in these subjects at home?
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-4 pl-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                        >
                          Like
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="w-full border-t bg-muted py-12">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold tracking-tight">Related Posts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {post.relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                  <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={`${relatedPost.title} thumbnail`}
                        width={400}
                        height={200}
                        className="h-full w-full object-cover transition-all group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <span className="text-xs text-muted-foreground">{relatedPost.date}</span>
                        <h3 className="font-bold group-hover:text-primary">{relatedPost.title}</h3>
                        <p className="text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Calendar, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Testimonial } from "@/components/testimonial"
import { NewsletterForm } from "@/components/newsletter-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <motion.div
                  className="flex flex-col justify-center space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Empowering Education for the Future
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Providing quality education from primary through high school levels in a nurturing environment.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg">
                      Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000"
                    width={550}
                    height={550}
                    alt="Diverse students in a modern classroom setting"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          <section id="about" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Vision Academy</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Established in 2005, Vision Academy is dedicated to providing comprehensive education for students
                    from primary through high school levels.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeIn}>
                  <Card className="border-none shadow-none">
                    <CardContent className="flex flex-col items-center space-y-4 p-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <BookOpen className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Modern Curriculum</h3>
                      <p className="text-center text-muted-foreground">
                        Our curriculum is designed to meet the needs of both primary and high school students,
                        supporting their academic and personal development.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Card className="border-none shadow-none">
                    <CardContent className="flex flex-col items-center space-y-4 p-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Experienced Faculty</h3>
                      <p className="text-center text-muted-foreground">
                        Our passionate educators provide personalized learning experiences that cater to individual
                        needs and strengths.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Card className="border-none shadow-none">
                    <CardContent className="flex flex-col items-center space-y-4 p-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Interactive Learning</h3>
                      <p className="text-center text-muted-foreground">
                        We promote age-appropriate learning methods for both primary and high school students to develop
                        critical thinking skills.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section id="mission" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="grid gap-10 md:grid-cols-2 md:gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000"
                    width={600}
                    height={400}
                    alt="Students collaborating on a project"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                  />
                </motion.div>
                <motion.div
                  className="flex flex-col justify-center space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Mission & Values</h2>
                    <p className="text-muted-foreground md:text-xl/relaxed">
                      At Vision Academy, our mission is to provide quality education for primary and high school
                      students that fosters academic excellence, personal growth, and a lifelong love of learning.
                    </p>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>
                        <strong>Integrity:</strong> We uphold the highest standards of honesty and ethics.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>
                        <strong>Respect:</strong> We foster a culture of respect for ourselves, others, and the
                        environment.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>
                        <strong>Excellence:</strong> We are committed to excellence in all aspects of education.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>
                        <strong>Inclusivity:</strong> We celebrate diversity and promote an inclusive atmosphere for
                        all.
                      </span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Button asChild>
                      <Link href="/about">Learn More About Us</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Community Says</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Hear from our students, parents, and alumni about their experiences at Vision Academy.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeIn}>
                  <Testimonial
                    quote="The teachers at Vision Academy truly care about each student's success. My daughter has thrived here academically and socially."
                    author="Sarah Johnson"
                    role="Parent"
                    avatarSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000"
                  />
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Testimonial
                    quote="I've learned so much more than just academics. The focus on real-world skills has prepared me for college and beyond."
                    author="Michael Chen"
                    role="12th Grade Student"
                    avatarSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
                  />
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Testimonial
                    quote="As an alumnus, I can say that my time at Vision Academy gave me the foundation for my successful career in engineering."
                    author="Jessica Williams"
                    role="Alumni, Class of 2018"
                    avatarSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000"
                  />
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section id="blog-preview" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest from Our Blog</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Stay updated with the latest news, events, and insights from our school community.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeIn}>
                  <Link href="/blog/new-stem-program" className="group">
                    <Card className="overflow-hidden transition-all hover:shadow-md">
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src="https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?q=80&w=1000"
                          alt="STEM Program thumbnail"
                          width={400}
                          height={200}
                          className="object-cover transition-all group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <span className="text-xs text-muted-foreground">April 15, 2023</span>
                          <h3 className="font-bold">New STEM Program Launches This Fall</h3>
                          <p className="text-sm text-muted-foreground">
                            Our school is excited to announce a new comprehensive STEM program designed to prepare
                            students for future careers.
                          </p>
                          <div className="flex items-center gap-2 pt-2">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                              Academics
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                              Announcements
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Link href="/blog/student-art-exhibition" className="group">
                    <Card className="overflow-hidden transition-all hover:shadow-md">
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1000"
                          alt="Art Exhibition thumbnail"
                          width={400}
                          height={200}
                          className="object-cover transition-all group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <span className="text-xs text-muted-foreground">April 10, 2023</span>
                          <h3 className="font-bold">Student Art Exhibition Opens Next Week</h3>
                          <p className="text-sm text-muted-foreground">
                            Join us for the annual student art exhibition showcasing incredible talent from students
                            across all grade levels.
                          </p>
                          <div className="flex items-center gap-2 pt-2">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                              Events
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                              Student Life
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Link href="/blog/final-exam-tips" className="group">
                    <Card className="overflow-hidden transition-all hover:shadow-md">
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000"
                          alt="Exam Tips thumbnail"
                          width={400}
                          height={200}
                          className="object-cover transition-all group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <span className="text-xs text-muted-foreground">April 5, 2023</span>
                          <h3 className="font-bold">Tips for Preparing for Final Exams</h3>
                          <p className="text-sm text-muted-foreground">
                            Our academic counselors have put together a comprehensive guide to help students prepare
                            effectively for final exams.
                          </p>
                          <div className="flex items-center gap-2 pt-2">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                              Academics
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                              Student Life
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </motion.div>
              <div className="flex justify-center">
                <Button asChild variant="outline">
                  <Link href="/blog">
                    View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <motion.div
                  className="flex flex-col justify-center space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                      Have questions about our programs or admissions? Contact us today.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Phone</p>
                        <p className="text-sm text-muted-foreground">(123) 456-7890</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Email</p>
                        <p className="text-sm text-muted-foreground">info@visionacademy.edu</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-primary"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Location</p>
                        <p className="text-sm text-muted-foreground">Gerji ገርጂ, Addis Ababa, Ethiopia</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button asChild>
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col gap-4 rounded-xl bg-muted p-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
                  <p className="text-sm text-muted-foreground">
                    Stay updated with the latest news, events, and announcements from our school.
                  </p>
                  <NewsletterForm />
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <SiteFooter />
    </div>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Award, BookOpen, Building, Clock, GraduationCap, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <motion.div
                  className="flex flex-col justify-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      About Vision Academy
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Established in 2005, Vision Academy is dedicated to providing a comprehensive and enriching
                      educational experience for students from Nursery through Grade 12.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button asChild size="lg">
                      <Link href="/contact">
                        Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/courses">Explore Courses</Link>
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000"
                    width={550}
                    height={550}
                    alt="Vision Academy campus"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-10 md:grid-cols-2 md:gap-16">
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
                  <p className="text-muted-foreground md:text-lg">
                    Vision Academy was founded in 2005 by a group of passionate educators who believed in creating a
                    learning environment that nurtures both academic excellence and character development. What began as
                    a small school with just 50 students has grown into a thriving educational institution serving over
                    1,200 students from diverse backgrounds.
                  </p>
                  <p className="text-muted-foreground md:text-lg">
                    Our journey has been marked by a commitment to innovation, inclusivity, and continuous improvement.
                    Over the years, we have expanded our facilities, enhanced our curriculum, and built a strong
                    community of students, parents, and educators who share our vision of education as a transformative
                    force.
                  </p>
                  <p className="text-muted-foreground md:text-lg">
                    Today, Vision Academy stands as a beacon of educational excellence, recognized for our holistic
                    approach to learning and our dedication to preparing students for success in a rapidly changing
                    world.
                  </p>
                </motion.div>
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Mission & Vision</h2>
                  <div className="space-y-4">
                    <motion.div className="rounded-lg border bg-card p-4" whileHover={{ y: -5 }}>
                      <h3 className="flex items-center text-xl font-bold">
                        <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                        Our Mission
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        To empower students through high-quality education that fosters academic excellence, personal
                        growth, and a lifelong love of learning in a supportive and inclusive environment.
                      </p>
                    </motion.div>
                    <motion.div className="rounded-lg border bg-card p-4" whileHover={{ y: -5 }}>
                      <h3 className="flex items-center text-xl font-bold">
                        <Award className="mr-2 h-5 w-5 text-primary" />
                        Our Vision
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        To be a leading educational institution that prepares students to thrive as responsible global
                        citizens, innovative thinkers, and compassionate leaders who contribute positively to society.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Core Values</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    These principles guide everything we do at Vision Academy.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeIn} whileHover={{ y: -10 }}>
                  <Card>
                    <CardContent className="flex flex-col items-center space-y-4 p-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
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
                          className="h-8 w-8 text-primary"
                        >
                          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">Integrity</h3>
                      <p className="text-center text-muted-foreground">
                        We uphold the highest standards of honesty, ethics, and accountability in all our actions.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={fadeIn} whileHover={{ y: -10 }}>
                  <Card>
                    <CardContent className="flex flex-col items-center space-y-4 p-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Respect</h3>
                      <p className="text-center text-muted-foreground">
                        We foster a culture of respect for ourselves, others, and the environment.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={fadeIn} whileHover={{ y: -10 }}>
                  <Card>
                    <CardContent className="flex flex-col items-center space-y-4 p-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Award className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Excellence</h3>
                      <p className="text-center text-muted-foreground">
                        We are committed to excellence in all aspects of education and continuous improvement.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={fadeIn} whileHover={{ y: -10 }}>
                  <Card>
                    <CardContent className="flex flex-col items-center space-y-4 p-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
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
                          className="h-8 w-8 text-primary"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="4" />
                          <line x1="4.93" x2="9.17" y1="4.93" y2="9.17" />
                          <line x1="14.83" x2="19.07" y1="14.83" y2="19.07" />
                          <line x1="14.83" x2="19.07" y1="9.17" y2="4.93" />
                          <line x1="14.83" x2="18.36" y1="9.17" y2="5.64" />
                          <line x1="4.93" x2="9.17" y1="19.07" y2="14.83" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">Inclusivity</h3>
                      <p className="text-center text-muted-foreground">
                        We celebrate diversity and promote an inclusive atmosphere for all.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Leadership Team</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Meet the dedicated professionals who guide our educational vision.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div className="flex flex-col items-center space-y-4" variants={fadeIn} whileHover={{ y: -10 }}>
                  <div className="relative h-40 w-40 overflow-hidden rounded-full">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000"
                      alt="Dr. Emily Chen"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Dr. Emily Chen</h3>
                    <p className="text-sm text-muted-foreground">Principal</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      With over 20 years of experience in education, Dr. Chen leads our school with passion and vision.
                    </p>
                  </div>
                </motion.div>
                <motion.div className="flex flex-col items-center space-y-4" variants={fadeIn} whileHover={{ y: -10 }}>
                  <div className="relative h-40 w-40 overflow-hidden rounded-full">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000"
                      alt="Prof. James Wilson"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Prof. James Wilson</h3>
                    <p className="text-sm text-muted-foreground">Academic Director</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Prof. Wilson oversees our curriculum development and ensures academic excellence across all
                      grades.
                    </p>
                  </div>
                </motion.div>
                <motion.div className="flex flex-col items-center space-y-4" variants={fadeIn} whileHover={{ y: -10 }}>
                  <div className="relative h-40 w-40 overflow-hidden rounded-full">
                    <Image
                      src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1000"
                      alt="Ms. Sarah Johnson"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Ms. Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">Student Affairs Director</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Ms. Johnson is dedicated to creating a supportive environment where every student can thrive.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Facilities</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Explore our well-equipped facilities designed to enhance the learning experience for both primary
                    and high school students.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div className="group overflow-hidden rounded-lg" variants={fadeIn} whileHover={{ y: -10 }}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000"
                      alt="Modern classrooms"
                      width={400}
                      height={225}
                      className="object-cover transition-all group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold">Primary School Classrooms</h3>
                    </div>
                  </div>
                </motion.div>
                <motion.div className="group overflow-hidden rounded-lg" variants={fadeIn} whileHover={{ y: -10 }}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000"
                      alt="Science laboratories"
                      width={400}
                      height={225}
                      className="object-cover transition-all group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold">High School Science Lab</h3>
                    </div>
                  </div>
                </motion.div>
                <motion.div className="group overflow-hidden rounded-lg" variants={fadeIn} whileHover={{ y: -10 }}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1000"
                      alt="Sports facilities"
                      width={400}
                      height={225}
                      className="object-cover transition-all group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold">Shared Sports Area</h3>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="mx-auto max-w-5xl"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="grid gap-6 md:grid-cols-3">
                  <motion.div
                    className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-4"
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                  >
                    <Building className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-bold">Library & Reading Room</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Our library houses age-appropriate books and resources for all grade levels.
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-4"
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                  >
                    <BookOpen className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-bold">Multi-purpose Hall</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      A 150-seat hall for assemblies, performances, and school events.
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-4"
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                  >
                    <Clock className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-bold">Computer Lab</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Equipped with computers for both primary and high school students.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Community</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Discover how Vision Academy can provide your child with an exceptional educational experience.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/contact">
                      Schedule a Visit <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/courses">Explore Our Programs</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </PageTransition>
      <SiteFooter />
    </div>
  )
}

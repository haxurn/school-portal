"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function CoursesPage() {
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
                      Our Academic Programs
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Discover our comprehensive curriculum designed for primary and high school students to inspire
                      curiosity, foster critical thinking, and prepare students for future success.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button asChild size="lg">
                      <Link href="/contact">
                        Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="#course-levels">Explore Programs</Link>
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1000"
                    width={300}
                    height={200}
                    alt="Mathematics class"
                    className="aspect-video overflow-hidden rounded-xl object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000"
                    width={300}
                    height={200}
                    alt="Science laboratory"
                    className="aspect-video overflow-hidden rounded-xl object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1000"
                    width={300}
                    height={200}
                    alt="Arts and music"
                    className="aspect-video overflow-hidden rounded-xl object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?q=80&w=1000"
                    width={300}
                    height={200}
                    alt="Technology class"
                    className="aspect-video overflow-hidden rounded-xl object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          <section id="course-levels" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Educational Levels</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Vision Academy offers comprehensive education from early childhood through high school.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="mx-auto mt-8 max-w-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Tabs defaultValue="elementary" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="early-years">Early Years (Ages 3-5)</TabsTrigger>
                    <TabsTrigger value="elementary">Elementary (Grades 1-5)</TabsTrigger>
                    <TabsTrigger value="secondary">Secondary (Grades 6-12)</TabsTrigger>
                  </TabsList>
                  <TabsContent value="early-years" className="mt-6 space-y-4">
                    <motion.div
                      className="grid gap-6 md:grid-cols-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div>
                        <Image
                          src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1000"
                          width={500}
                          height={300}
                          alt="Early childhood education"
                          className="aspect-video overflow-hidden rounded-xl object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Early Childhood Education</h3>
                        <p className="text-muted-foreground">
                          Our Early Years program provides a nurturing environment where young children develop
                          foundational skills through play-based learning, creative exploration, and social interaction.
                        </p>
                        <ul className="space-y-2">
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
                            <span>Nursery (Age 3)</span>
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
                            <span>Pre-Kindergarten (Age 4)</span>
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
                            <span>Kindergarten (Age 5)</span>
                          </li>
                        </ul>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button asChild>
                            <Link href="/contact">Learn More</Link>
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="elementary" className="mt-6 space-y-4">
                    <motion.div
                      className="grid gap-6 md:grid-cols-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div>
                        <Image
                          src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1000"
                          width={500}
                          height={300}
                          alt="Elementary education"
                          className="aspect-video overflow-hidden rounded-xl object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Elementary Education</h3>
                        <p className="text-muted-foreground">
                          Our Primary School program builds a strong foundation in core subjects while encouraging
                          creativity, critical thinking, and character development in a nurturing environment.
                        </p>
                        <ul className="space-y-2">
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
                            <span>Lower Elementary (Grades 1-2)</span>
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
                            <span>Middle Elementary (Grades 3-4)</span>
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
                            <span>Upper Elementary (Grade 5)</span>
                          </li>
                        </ul>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button asChild>
                            <Link href="/contact">Learn More</Link>
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="secondary" className="mt-6 space-y-4">
                    <motion.div
                      className="grid gap-6 md:grid-cols-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div>
                        <Image
                          src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000"
                          width={500}
                          height={300}
                          alt="Secondary education"
                          className="aspect-video overflow-hidden rounded-xl object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Secondary Education</h3>
                        <p className="text-muted-foreground">
                          Our High School program prepares students for college and beyond through focused academics,
                          specialized courses, and opportunities for leadership and personal growth.
                        </p>
                        <ul className="space-y-2">
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
                            <span>Middle School (Grades 6-8)</span>
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
                            <span>High School (Grades 9-12)</span>
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
                            <span>International Baccalaureate (IB) Program (Grades 11-12)</span>
                          </li>
                        </ul>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button asChild>
                            <Link href="/contact">Learn More</Link>
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
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
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Academic Subjects</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our comprehensive curriculum covers a wide range of subjects to provide a well-rounded education.
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
                <motion.div variants={fadeIn} whileHover={{ y: -10 }}>
                  <Card>
                    <CardHeader>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
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
                          <path d="M2 12h20" />
                          <path d="M2 12v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8" />
                          <path d="M2 12v-2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" />
                          <path d="M6 10V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
                        </svg>
                      </div>
                      <CardTitle className="mt-4">Mathematics</CardTitle>
                      <CardDescription>
                        From foundational arithmetic to advanced calculus and statistics
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>Number Sense & Operations</li>
                        <li>Algebra & Functions</li>
                        <li>Geometry & Measurement</li>
                        <li>Data Analysis & Probability</li>
                        <li>Calculus (Advanced)</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="/contact">Learn More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                <motion.div variants={fadeIn} whileHover={{ y: -10 }}>
                  <Card>
                    <CardHeader>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
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
                          <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                          <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                          <circle cx="12" cy="12" r="2" />
                          <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                          <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                        </svg>
                      </div>
                      <CardTitle className="mt-4">Science</CardTitle>
                      <CardDescription>Exploring the natural world through inquiry and experimentation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>Life Sciences & Biology</li>
                        <li>Physical Sciences & Chemistry</li>
                        <li>Earth & Space Sciences</li>
                        <li>Environmental Science</li>
                        <li>Physics (Advanced)</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="/contact">Learn More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                <motion.div variants={fadeIn} whileHover={{ y: -10 }}>
                  <Card>
                    <CardHeader>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="mt-4">Language Arts</CardTitle>
                      <CardDescription>
                        Developing strong communication skills through reading and writing
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>Reading & Literature</li>
                        <li>Writing & Composition</li>
                        <li>Grammar & Language Mechanics</li>
                        <li>Speaking & Listening</li>
                        <li>Research & Media Literacy</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="/contact">Learn More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
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
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Join Vision Academy?</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Take the next step in your educational journey with us.
                  </p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild size="lg">
                      <Link href="/contact">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/contact">Schedule a Visit</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
      </PageTransition>
      <SiteFooter />
    </div>
  )
}

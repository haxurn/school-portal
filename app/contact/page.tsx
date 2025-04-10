"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Loader2, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                    We'd love to hear from you. Reach out with questions about admissions, programs, or to schedule a
                    campus visit.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-10 md:grid-cols-2">
                <motion.div className="space-y-6" variants={fadeIn} initial="hidden" animate="visible">
                  <div>
                    <h2 className="text-2xl font-bold">Get in Touch</h2>
                    <p className="mt-2 text-muted-foreground">
                      Fill out the form and our team will get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                    </div>
                    <div className="space-y-2">
                      <Label>I am a</Label>
                      <RadioGroup defaultValue="parent" className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="parent" id="parent" />
                          <Label htmlFor="parent" className="font-normal">
                            Parent/Guardian
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="student" id="student" />
                          <Label htmlFor="student" className="font-normal">
                            Prospective Student
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other" className="font-normal">
                            Other
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inquiry-type">Inquiry Type</Label>
                      <Select>
                        <SelectTrigger id="inquiry-type">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admissions">Admissions Information</SelectItem>
                          <SelectItem value="tour">Schedule a Tour</SelectItem>
                          <SelectItem value="programs">Academic Programs</SelectItem>
                          <SelectItem value="tuition">Tuition & Financial Aid</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide details about your inquiry..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" className="w-full" disabled={isSubmitting || isSuccess}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Message Sent
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </motion.div>

                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="aspect-video overflow-hidden rounded-xl">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5511167456!2d38.82114!3d9.0078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sGerji%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1586539283483!5m2!1sen!2sus"
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-full w-full"
                    ></iframe>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Contact Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <motion.div whileHover={{ y: -5 }}>
                        <Card>
                          <CardContent className="flex flex-col items-center p-6 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                              <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="mt-4 font-bold">Main Location</h4>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Gerji ገርጂ
                              <br />
                              Addis Ababa, Ethiopia
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                      <motion.div whileHover={{ y: -5 }}>
                        <Card>
                          <CardContent className="flex flex-col items-center p-6 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                              <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="mt-4 font-bold">Phone</h4>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Main: (123) 456-7890
                              <br />
                              Admissions: (123) 456-7891
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                    <motion.div whileHover={{ y: -5 }}>
                      <Card>
                        <CardContent className="flex flex-col items-center p-6 text-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Mail className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="mt-4 font-bold">Email</h4>
                          <p className="mt-2 text-sm text-muted-foreground">
                            General Inquiries: info@visionacademy.edu
                            <br />
                            Admissions: admissions@visionacademy.edu
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">School Hours</h3>
                    <div className="rounded-lg border p-4">
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="font-medium">Monday - Friday</dt>
                          <dd className="text-muted-foreground">8:00 AM - 4:30 PM</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="font-medium">Saturday (Admin Office)</dt>
                          <dd className="text-muted-foreground">9:00 AM - 1:00 PM</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="font-medium">Sunday</dt>
                          <dd className="text-muted-foreground">Closed</dd>
                        </div>
                      </dl>
                    </div>
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
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Find answers to common questions about Vision Academy.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="space-y-4">
                  <motion.div whileHover={{ y: -5 }} className="rounded-lg border bg-card p-4">
                    <h3 className="font-bold">What are the admissions requirements?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Admissions requirements vary by grade level. Generally, we consider academic records,
                      recommendation letters, entrance assessments, and an interview. Please contact our Admissions
                      Office for specific requirements.
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="rounded-lg border bg-card p-4">
                    <h3 className="font-bold">Do you offer financial aid or scholarships?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Yes, Vision Academy offers need-based financial aid and merit scholarships. Applications for
                      financial assistance are reviewed separately from admissions decisions.
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="rounded-lg border bg-card p-4">
                    <h3 className="font-bold">What is the student-to-teacher ratio?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Our average student-to-teacher ratio is 15:1, allowing for personalized attention and support for
                      each student.
                    </p>
                  </motion.div>
                </div>
                <div className="space-y-4">
                  <motion.div whileHover={{ y: -5 }} className="rounded-lg border bg-card p-4">
                    <h3 className="font-bold">Do you provide transportation services?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Yes, we offer bus transportation for students living within a 15-mile radius of the school.
                      Additional fees apply for this service.
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="rounded-lg border bg-card p-4">
                    <h3 className="font-bold">What extracurricular activities are available?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We offer a wide range of extracurricular activities including sports, arts, music, clubs, and
                      community service opportunities. Activities vary by grade level.
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="rounded-lg border bg-card p-4">
                    <h3 className="font-bold">How can I schedule a campus tour?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You can schedule a campus tour by contacting our Admissions Office directly or by filling out the
                      contact form on this page.
                    </p>
                  </motion.div>
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

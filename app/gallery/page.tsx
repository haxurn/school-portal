"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"

// Gallery image data with Unsplash images
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000",
    alt: "Modern classroom with students",
    category: "campus",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000",
    alt: "School library",
    category: "campus",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1000",
    alt: "Sports field",
    category: "campus",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1000",
    alt: "Student working on project",
    category: "students",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000",
    alt: "Students in a group discussion",
    category: "students",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000",
    alt: "Student presentation",
    category: "students",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000",
    alt: "Teacher helping students",
    category: "faculty",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1548449112-96a38a643324?q=80&w=1000",
    alt: "Teacher in classroom",
    category: "faculty",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1000",
    alt: "Faculty meeting",
    category: "faculty",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1000",
    alt: "Math class in session",
    category: "academics",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000",
    alt: "Science laboratory",
    category: "academics",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1000",
    alt: "Art class",
    category: "academics",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000",
    alt: "Sports event",
    category: "events",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1000",
    alt: "Art exhibition",
    category: "events",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?q=80&w=1000",
    alt: "STEM program showcase",
    category: "events",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const filteredImages =
    activeCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <PageTransition>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">School Gallery</h1>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                    Explore our vibrant campus life, academic activities, and special events through our photo gallery.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
                <motion.div
                  className="flex justify-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <TabsList className="grid grid-cols-3 md:grid-cols-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="campus">Campus</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="faculty">Faculty</TabsTrigger>
                    <TabsTrigger value="academics">Academics</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                  </TabsList>
                </motion.div>

                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center min-h-[400px]"
                    >
                      <motion.div
                        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      <p className="mt-4 text-muted-foreground">Loading gallery...</p>
                    </motion.div>
                  ) : (
                    <TabsContent value={activeCategory} className="mt-0">
                      <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                      >
                        {filteredImages.map((image) => (
                          <motion.div
                            key={image.id}
                            layoutId={`image-${image.id}`}
                            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                            variants={itemVariants}
                            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setSelectedImage(image.id)}
                          >
                            <Image
                              src={image.src || "/placeholder.svg"}
                              alt={image.alt}
                              fill
                              className="object-cover transition-all"
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
                          </motion.div>
                        ))}
                      </motion.div>
                    </TabsContent>
                  )}
                </AnimatePresence>
              </Tabs>
            </div>
          </section>

          {/* Lightbox for selected image */}
          <AnimatePresence>
            {selectedImage !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  layoutId={`image-${selectedImage}`}
                  className="relative max-w-4xl max-h-[80vh] w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={galleryImages.find((img) => img.id === selectedImage)?.src || ""}
                    alt={galleryImages.find((img) => img.id === selectedImage)?.alt || ""}
                    width={1200}
                    height={800}
                    className="object-contain w-full h-full rounded-lg"
                  />
                  <motion.button
                    className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2"
                    onClick={() => setSelectedImage(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
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
                      className="h-6 w-6"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </PageTransition>
      <SiteFooter />
    </div>
  )
}

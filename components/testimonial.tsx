import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

interface TestimonialProps {
  quote: string
  author: string
  role: string
  avatarSrc: string
}

export function Testimonial({ quote, author, role, avatarSrc }: TestimonialProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image src={avatarSrc || "/placeholder.svg"} alt={author} fill className="object-cover" />
          </div>
          <blockquote className="text-muted-foreground">"{quote}"</blockquote>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

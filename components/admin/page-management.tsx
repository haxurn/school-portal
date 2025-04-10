"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Edit, Eye, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface Page {
  id: number
  title: string
  slug: string
  content: string
  meta_description: string | null
  last_updated: string
}

interface PageManagementProps {
  initialPages: Page[]
}

export function PageManagement({ initialPages }: PageManagementProps) {
  const [pages, setPages] = useState<Page[]>(initialPages)
  const [search, setSearch] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(search.toLowerCase()) || page.slug.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          type="search"
          placeholder="Search pages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPages.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No pages found.</p>
          </div>
        ) : (
          filteredPages.map((page) => (
            <Card key={page.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  {page.title}
                </CardTitle>
                <CardDescription>/{page.slug}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {page.meta_description || "No description available."}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Last updated: {new Date(page.last_updated).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/${page.slug}`} target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/admin/pages/${page.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

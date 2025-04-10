import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Skeleton className="h-12 w-64 mx-auto" />
                <Skeleton className="h-6 w-96 mx-auto" />
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-40" />
                  <Skeleton className="h-px flex-1" />
                </div>
                <div className="grid gap-8">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="overflow-hidden">
                        <div className="md:grid md:grid-cols-[1fr_2fr] md:gap-4">
                          <Skeleton className="aspect-video w-full md:aspect-square" />
                          <div className="p-4 md:p-6 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <div className="flex flex-wrap items-center gap-2 pt-2">
                              <Skeleton className="h-5 w-20 rounded-full" />
                              <Skeleton className="h-5 w-20 rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="space-y-8">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-60 w-full" />
                <Skeleton className="h-60 w-full" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

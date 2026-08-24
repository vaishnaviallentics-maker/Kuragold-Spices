import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getPublishedBlogs } from '@/hooks/useProducts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stories, recipes, and spice purity guides from the Kura Gold kitchen.',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const blogs = await getPublishedBlogs()

  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <SectionLabel className="justify-center">Our Blog</SectionLabel>
          <h1 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            From the Kura Gold Kitchen
          </h1>
          <p className="mt-2 text-sm text-muted">
            Stories, tips and inspiration for better cooking.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-gold/40 bg-white p-10 text-center shadow-md">
            <span className="font-heading text-2xl font-bold text-maroon">Coming Soon</span>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Our culinary team is preparing authentic Indian recipes and spice guides. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-gold/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg"
              >
                <div className="relative h-48 w-full bg-cream">
                  {blog.cover_image && (
                    <Image
                      src={blog.cover_image}
                      alt={blog.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute top-3 left-3 rounded-full bg-maroon px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-ivory">
                    {blog.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-maroon group-hover:underline">
                      {blog.title}
                    </h2>
                    <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-3">{blog.excerpt}</p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1 font-body text-xs font-bold uppercase tracking-wider text-maroon group-hover:text-gold">
                    Read Full Story →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

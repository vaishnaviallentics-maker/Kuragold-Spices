import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { LinkButton } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/public'
import type { Blog } from '@/types'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()

  return (data as Blog) ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug)
  if (!blog) return {}

  return {
    title: blog.title,
    description: blog.excerpt || blog.title,
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const blog = await getBlogBySlug(params.slug)
  if (!blog) notFound()

  return (
    <main className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <article className="mx-auto max-w-3xl rounded-3xl border border-gold/30 bg-white p-6 sm:p-10 shadow-sm">
        <span className="rounded-full bg-cream px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-maroon">
          {blog.category}
        </span>
        <h1 className="mt-4 font-heading text-3xl font-bold text-maroon sm:text-4xl">
          {blog.title}
        </h1>
        {blog.published_at && (
          <p className="mt-2 font-body text-xs text-muted">
            Published on {new Date(blog.published_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
          </p>
        )}

        {blog.cover_image && (
          <div className="relative mt-6 h-64 sm:h-80 w-full overflow-hidden rounded-2xl bg-cream">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {blog.excerpt && (
          <p className="mt-6 text-base font-semibold leading-relaxed text-maroon/90 italic border-l-4 border-gold pl-4">
            {blog.excerpt}
          </p>
        )}

        <div className="mt-8 text-sm sm:text-base leading-relaxed text-ink whitespace-pre-line border-t border-border-gold/30 pt-6">
          {blog.content}
        </div>

        <div className="mt-10 border-t border-border-gold/30 pt-6">
          <LinkButton href="/blog" variant="outline">
            ← Back to All Blogs
          </LinkButton>
        </div>
      </article>
    </main>
  )
}

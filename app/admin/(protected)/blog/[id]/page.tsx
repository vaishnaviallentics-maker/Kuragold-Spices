import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { deleteBlog, updateBlog } from '@/app/admin/actions'
import { createClient } from '@/lib/supabase/server'
import type { Blog } from '@/types'

export const dynamic = 'force-dynamic'

interface Props {
  params: { id: string }
}

export default async function AdminBlogEditPage({ params }: Props) {
  const supabase = createClient()
  const { data } = await supabase.from('blogs').select('*').eq('id', params.id).single()

  if (!data) notFound()

  const blog = data as Blog
  const updateBlogWithId = updateBlog.bind(null, blog.id)
  const deleteBlogWithId = deleteBlog.bind(null, blog.id)

  const inputClass =
    'w-full rounded-lg border border-border-gold bg-white px-4 py-2.5 font-body text-sm text-ink outline-none focus:border-maroon focus:ring-1 focus:ring-maroon'
  const labelClass = 'block font-body text-xs font-bold uppercase tracking-wider text-muted mb-1'

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-maroon"
        >
          <ArrowLeft size={16} />
          Back to Blog Posts
        </Link>

        <form action={deleteBlogWithId}>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2 font-body text-xs font-bold text-rose-700 hover:bg-rose-100"
          >
            <Trash2 size={14} />
            Delete Post
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-border-gold bg-white p-6 sm:p-8 shadow-xs">
        <h1 className="font-heading text-2xl font-bold text-maroon mb-6">Edit Blog Post</h1>

        <form action={updateBlogWithId} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Blog Title</label>
              <input type="text" name="title" defaultValue={blog.title} required className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>URL Slug</label>
              <input type="text" name="slug" defaultValue={blog.slug} required className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Category</label>
              <select name="category" defaultValue={blog.category || 'general'} className={inputClass}>
                <option value="general">General</option>
                <option value="recipes">Recipes &amp; Dishes</option>
                <option value="guides">Spice Purity Guides</option>
                <option value="news">Brand News</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Cover Image URL</label>
              <input
                type="text"
                name="cover_image"
                defaultValue={blog.cover_image ?? ''}
                placeholder="/about/quality-hero-spices.jpg"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Excerpt (Short Summary)</label>
            <textarea
              name="excerpt"
              rows={2}
              defaultValue={blog.excerpt ?? ''}
              className={inputClass}
              placeholder="Brief 1-2 sentence description of the article..."
            />
          </div>

          <div>
            <label className={labelClass}>Article Content</label>
            <textarea
              name="content"
              rows={12}
              defaultValue={blog.content ?? ''}
              className={inputClass}
              placeholder="Write full article body text..."
            />
          </div>

          <div className="flex items-center gap-3 border-t border-border-gold/40 pt-4">
            <input
              type="checkbox"
              id="is_published"
              name="is_published"
              defaultChecked={blog.is_published}
              className="h-4 w-4 rounded border-border-gold text-maroon focus:ring-maroon"
            />
            <label htmlFor="is_published" className="font-body text-sm font-bold text-maroon cursor-pointer">
              Publish this article live on site
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="rounded-full bg-maroon px-8 py-3 font-body text-xs font-bold uppercase tracking-widest text-white hover:bg-maroon-dark shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

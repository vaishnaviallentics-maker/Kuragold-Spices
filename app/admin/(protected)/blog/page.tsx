import Link from 'next/link'
import { Plus, Edit2 } from 'lucide-react'
import { createBlog } from '@/app/admin/actions'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'
import type { Blog } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminBlogPage() {
  const supabase = createClient()
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  const blogList = (blogs as Blog[]) ?? []

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-maroon">Blog Posts</h1>
          <p className="text-sm text-muted">Create and manage recipes, spice guides, and brand stories.</p>
        </div>

        <form action={createBlog}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-maroon px-4 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-maroon-dark shadow-sm"
          >
            <Plus size={16} />
            New Blog Post
          </button>
        </form>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-gold bg-white shadow-xs">
        <table className="w-full text-left font-body text-sm text-ink">
          <thead className="bg-cream/60 text-xs font-bold uppercase tracking-wider text-maroon border-b border-border-gold">
            <tr>
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Created Date</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gold/40">
            {blogList.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  No blog posts created yet. Click "New Blog Post" above to write your first article.
                </td>
              </tr>
            ) : (
              blogList.map((blog) => (
                <tr key={blog.id} className="hover:bg-cream/20 transition-colors">
                  <td className="px-5 py-4 font-bold text-maroon">{blog.title}</td>
                  <td className="px-5 py-4 uppercase text-xs font-semibold text-muted">{blog.category}</td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        'rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider',
                        blog.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      )}
                    >
                      {blog.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-muted">
                    {new Date(blog.created_at).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/blog/${blog.id}`}
                      className="inline-flex items-center gap-1 rounded-md bg-cream px-3 py-1.5 font-body text-xs font-bold text-maroon hover:bg-gold/20"
                    >
                      <Edit2 size={13} />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

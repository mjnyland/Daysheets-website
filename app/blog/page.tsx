import Link from 'next/link'
import { client } from '@/sanity/lib/client'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
}

async function getPosts(): Promise<Post[]> {
  const posts = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt
    }`
  )
  return posts
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-gray-600">No blog posts yet. Create one in the Sanity Studio!</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="block p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
              >
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                {post.publishedAt && (
                  <p className="text-gray-600 text-sm">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { PortableText, type PortableTextBlock } from 'next-sanity'

interface Post {
  _id: string
  title: string
  content: PortableTextBlock[]
  publishedAt: string
}

async function getPost(slug: string): Promise<Post | null> {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      content,
      publishedAt
    }`,
    { slug }
  )
  return post
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {post.publishedAt && (
            <p className="text-gray-600">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <PortableText value={post.content} />
        </div>
      </div>
    </article>
  )
}

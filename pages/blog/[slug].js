import { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import { PortableText } from "@portabletext/react"
import Form from "../../components/templates/Form"

const blogQuery = groq`
*[_type == 'blog' && slug.current == $slug][0]
`

export async function getStaticPaths() {
    const paths = await sanityRes.fetch(groq`
        *[_type == 'blog' && defined(slug.current)][].slug.current
    `)

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params
    const blog = await sanityRes.fetch(blogQuery, { slug })

    return {
        props: {
            blog
        }
    }
}

export default function blogDetail({ blog }) {
    return (
        <div className="section">
            <div className="container">
                <div className="md:flex gap-10">
                    <div className="md:w-2/3">
                        {blog.body &&
                            <PortableText
                                value={blog.body}
                            />
                        }
                    </div>
                    <div className="md:w-1/3">
                        <div className="bg-white p-4">
                            <h3 className="h4">Send an email</h3>
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
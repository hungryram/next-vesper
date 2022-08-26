import { sanityRes } from "../../lib/sanity"
import { groq } from "next-sanity"
import Link from 'next/link'
import BlogCard from "../../components/templates/BlogCard"

const queryBlog = groq`
*[_type == 'blog']
`

export async function getStaticProps() {
    const res = await sanityRes.fetch(queryBlog)

    return {
        props: {
            res
        }
    }
}

export default function index({ res }) {
    return (
        <div className="section">
            <div className="container">
                <div className="md:flex gap-10">
                    <div className="md:w-2/3">
                        {res.map((node) => {
                            return (
                                <BlogCard
                                    title={node.title}
                                    link={"/blog/" + node.slug.current}
                                    image={node.mainImage}
                                    date={node.publishedAt}
                                    excerpt={node.excerpt}
                                    altTag={node.alt_tag}
                                />
                            )
                        })}
                    </div>
                    <div className="md:w-1/3">

                    </div>
                </div>
            </div>
        </div>
    )
}

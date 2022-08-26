import { sanityRes } from "../../lib/sanity"
import { groq } from "next-sanity"
import BlogCard from "../../components/templates/BlogCard"

const queryBlog = groq`
*[_type == 'blog']{
    title,
    'slug': slug.current,
    mainImage,
    publishedAt,
    excerpt,
    alt_tag,
    _id
}
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
                                    link={"/blog/" + node.slug}
                                    image={node.mainImage}
                                    date={node.publishedAt}
                                    excerpt={node.excerpt}
                                    altTag={node.alt_tag}
                                    key={node._id}
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

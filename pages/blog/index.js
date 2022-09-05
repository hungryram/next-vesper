import { sanityRes } from "../../lib/sanity"
import { groq } from "next-sanity"
import BlogCard from "../../components/templates/BlogCard"
import Sidebar from "../../components/templates/Sidebar"
import Seo from "../../components/global/Seo"
import Header from "../../components/templates/Header"

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

export default function BlogIndex({ res }) {
    return (
        <>
        <Seo
            title="Latest Posts"
            description="Keep up to date with the latest blog posts"
        />
        <Header
            title="Latest Posts"
        />
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
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

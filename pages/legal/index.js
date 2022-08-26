import { sanityRes } from "../../lib/sanity"
import { groq } from "next-sanity"
import Link from 'next/link'

const queryLegal = groq`
*[_type == 'legal']{
    title,
    'slug': slug.current,
    _id
}
`

export async function getStaticProps() {
    const res = await sanityRes.fetch(queryLegal)

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
                <div className="text-center">
                    <ul>
                        {res.map((node) => {
                            return (
                                <li key={node._id}>
                                    <Link href={"/legal/" + node.slug.current}>
                                        <a className="text-2xl">{node.title}</a>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

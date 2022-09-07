import { sanityRes } from "../../lib/sanity"
import { groq } from "next-sanity"
import Link from 'next/link'
import Header from "../../components/templates/Header"
import Seo from "../../components/global/Seo"

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

export default function LegalIndex({ res }) {
    const array = ['1', '2', '4']

    return (
        <>
        <Seo
            title="Website Policies"
            description="View website policies"
        />
        <Header
            title="Website Policies"
        />
                <div className="section">
            <div className="container">
                <div className="text-center">
                    <ul>
                        {res.map((node) => {
                            return (
                                <li key={node._id}>
                                    <Link href={"/legal/" + node.slug}>
                                        <a className="text-2xl">{node.title}</a>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
        <div className="section">
            <div className="container">
            <EmblaCarousel slides={array}/>
            </div>
        </div>

        </>
    )
}

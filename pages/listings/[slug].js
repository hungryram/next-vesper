import { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import { PortableText } from "@portabletext/react"

const queryListings = groq`
*[_type == 'listings' && slug.current == $slug][0]
`

export async function getStaticPaths() {
    const paths = await sanityRes.fetch(groq`
        *[_type == 'listings' && defined(slug.current)][].slug.current
    `)

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params
    const listings = await sanityRes.fetch(queryListings, { slug })

    return {
        props: {
            listings
        }
    }
}

export default function listingDetail({ listings }) {
    return (
        <div className="section">
            <div className="container content">

            </div>
        </div>
    )
}
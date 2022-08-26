import { sanityRes } from "../lib/sanity"
import { groq } from 'next-sanity'

const pageQuery = groq`
*[_type == 'pages' && slug.current == $slug][0]
`

export async function getStaticPaths() {
    const paths = await sanityRes.fetch(groq`
        *[_type == 'pages' && defined(slug.current)][].slug.current
    `)

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params
    const page = await sanityRes.fetch(pageQuery, { slug })

    return {
        props: {
          page
        }
    }
}

export default function Pages({ page }) {
    return (
        <div className="section">
            <div className="container">
            </div>
        </div>
    )
}
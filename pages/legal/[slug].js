import { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import { PortableText } from "@portabletext/react"
import urlFor from "../../lib/sanity"
import { BiMobileAlt, BiEnvelope, BiGlobe } from "react-icons/bi"
import Form from "../../components/templates/Form"
import Image from "next/image"

const queryLegal = groq`
*[_type == 'legal' && slug.current == $slug][0]
`

export async function getStaticPaths() {
    const paths = await sanityRes.fetch(groq`
        *[_type == 'legal' && defined(slug.current)][].slug.current
    `)

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params
    const legal = await sanityRes.fetch(queryLegal, { slug })

    return {
        props: {
            legal
        }
    }
}

export default function legalDetail({ legal }) {
    return (
        <div className="section">
            <div className="container content">
                {legal.content &&
                    <PortableText
                        value={legal.content}
                    /> 
                }
            </div>
        </div>
    )
}
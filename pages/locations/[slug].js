import { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import { PortableText } from "@portabletext/react"
import urlFor from "../../lib/sanity"
import { BiMobileAlt, BiEnvelope, BiGlobe } from "react-icons/bi"
import Form from "../../components/templates/Form"
import Image from "next/image"

const locationQuery = groq`
*[_type == 'locations' && slug.current == $slug][0]
`

export async function getStaticPaths() {
    const paths = await sanityRes.fetch(groq`
        *[_type == 'locations' && defined(slug.current)][].slug.current
    `)

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params
    const location = await sanityRes.fetch(locationQuery, { slug })

    return {
        props: {
            location
        }
    }
}

if (router.isFallback) {
    return <div>Loading...</div>
  }

export default function locationDetail({ location }) {
    return (
        <div className="section">
            <div className="container">
                <div className="md:flex gap-10">
                    <div className="md:w-2/3">
                        <div className="bg-white p-6">
                            <div className="md:flex gap-10">
                                <div className="md:w-1/2 relative w-full h-80">
                                    <div>
                                        {location?.image &&
                                            <Image
                                                src={urlFor(location?.image).url()}
                                                layout="fill"
                                                objectFit="cover"
                                                quality={50}
                                                alt={location.name}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className="md:w-2/3">
                                    {location.name && <h1 className="h3">{location.name}</h1>}
                                    <div className="mt-8">
                                        <ul>
                                            {location.contactInformation.phoneNumber && <li className="flex items-center my-2"><BiMobileAlt className="inline text-xl mr-4 text-slate-500" /><a href={`tel:${location.contactInformation.phoneNumber}`}>{location.contactInformation.phoneNumber}</a></li>}
                                            {location.contactInformation.email && <li className="flex items-center my-2"><BiEnvelope className="inline text-xl mr-4 text-slate-500" /><a href={`mailto:${location.contactInformation.email}`}>{location.contactInformation.email}</a></li>}
                                            {location.contactInformation.websiteLink && <li className="flex items-center my-2"><BiGlobe className="inline text-xl mr-4 text-slate-500" /><a href={`tel:${location.contactInformation.websiteLink}`}>Visit Website</a></li>}
                                        </ul>
                                    </div>
                                    <div className="mt-14">
                                        <a href={`mailto:${location.contactInformation.email}`} className="primary-button text-white">Send an Email</a>
                                        <a href={`tel:${location.contactInformation.phoneNumber}`} className="bg-transparent text-black border py-2 px-4 rounded-md border-black">Call</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {location?.about &&
                            <div className="bg-white p-6 mt-4">
                                <h3 className="h4 mb-4">About</h3>
                                <PortableText
                                    value={location?.about}
                                />
                            </div>
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
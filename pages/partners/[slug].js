import { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import { PortableText } from "@portabletext/react"
import urlFor from "../../lib/sanity"
import { BiMobileAlt, BiEnvelope, BiGlobe } from "react-icons/bi"
import Form from "../../components/templates/Form"
import Image from "next/image"

const partnerQuery = groq`
*[_type == 'partners' && slug.current == $slug][0]
`

export async function getStaticPaths() {
    const paths = await sanityRes.fetch(groq`
        *[_type == 'partners' && defined(slug.current)][].slug.current
    `)

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params
    const partner = await sanityRes.fetch(partnerQuery, { slug })

    return {
        props: {
            partner
        }
    }
}



export default function PartnerDetail({ partner }) {

    return (
        <div className="section">
            <div className="container">
                <div className="md:flex gap-10">
                    <div className="md:w-2/3">
                        <div className="bg-white p-6">
                            <div className="md:flex gap-10">
                                <div className="md:w-1/2 relative w-full h-80">
                                    <div>
                                        {partner?.image &&
                                            <Image
                                                src={urlFor(partner?.image).url()}
                                                layout="fill"
                                                objectFit="cover"
                                                quality={50}
                                                alt={partner.name}
                                                placeholder="blur"
                                                blurDataURL={urlFor(partner?.image).width(50).height(50).quality(1).url()}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className="md:w-2/3">
                                    {partner.name && <h1 className="h3">{partner.name}</h1>}
                                    <div className="mt-8">
                                        <ul>
                                            {partner.contactInformation.phoneNumber && <li className="flex items-center my-2"><BiMobileAlt className="inline text-xl mr-4 text-slate-500" /><a href={`tel:${partner.contactInformation.phoneNumber}`}>{partner.contactInformation.phoneNumber}</a></li>}
                                            {partner.contactInformation.email && <li className="flex items-center my-2"><BiEnvelope className="inline text-xl mr-4 text-slate-500" /><a href={`mailto:${partner.contactInformation.email}`}>{partner.contactInformation.email}</a></li>}
                                            {partner.contactInformation.websiteLink && <li className="flex items-center my-2"><BiGlobe className="inline text-xl mr-4 text-slate-500" /><a href={partner.contactInformation.websiteLink} target="_blank" rel="noreferrer">Visit Website</a></li>}
                                        </ul>
                                    </div>
                                    <div className="mt-14">
                                        <a href={`mailto:${partner.contactInformation.email}`} className="primary-button text-white">Send an Email</a>
                                        <a href={`tel:${partner.contactInformation.phoneNumber}`} className="bg-transparent text-black border py-2 px-4 rounded-md border-black">Call</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {partner?.about &&
                            <div className="bg-white p-6 mt-4">
                                <h3 className="h4 mb-4">About</h3>
                                <PortableText
                                    value={partner?.about}
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
import { sanityRes } from "../../lib/sanity"
import urlFor from "../../lib/sanity"
import { groq } from 'next-sanity'
import Image from "next/image"
import { BiMobileAlt, BiEnvelope, BiGlobe } from "react-icons/bi"
import Form from "../../components/templates/Form"
import { PortableText } from "@portabletext/react"

const teamQuery = groq`
*[_type == 'team' && slug.current == $slug][0]
`

export async function getStaticPaths() {
    const paths = await sanityRes.fetch(groq`
        *[_type == 'team' && defined(slug.current)][].slug.current
    `)

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params
    const team = await sanityRes.fetch(teamQuery, { slug })

    return {
        props: {
            team
        }
    }
}



export default function TeamDetail({ team }) {

    return (
        <div className="section">
            <div className="container">
                <div className="md:flex gap-10">
                    <div className="md:w-2/3">
                        <div className="bg-white p-6">
                            <div className="md:flex gap-20">
                                <div className="md:w-1/2 relative w-full h-80">
                                    <div>
                                        {team?.image &&
                                            <Image
                                                src={urlFor(team?.image).url()}
                                                layout="fill"
                                                objectFit="cover"
                                                quality={50}
                                                alt={team.name}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className="md:w-2/3">
                                    {team.name && <h1 className="h3">{team.name}</h1>}
                                    {team.position && <p>{team.position}</p>}
                                    <div className="mt-8">
                                        <ul>
                                            {team.contactInformation.phoneNumber && <li className="flex items-center my-2"><BiMobileAlt className="inline text-xl mr-4 text-slate-500" /><a href={`tel:${team.contactInformation.phoneNumber}`}>{team.contactInformation.phoneNumber}</a></li>}
                                            {team.contactInformation.email && <li className="flex items-center my-2"><BiEnvelope className="inline text-xl mr-4 text-slate-500" /><a href={`mailto:${team.contactInformation.email}`}>{team.contactInformation.email}</a></li>}
                                            {team.contactInformation.websiteLink && <li className="flex items-center my-2"><BiGlobe className="inline text-xl mr-4 text-slate-500" /><a href={`tel:${team.contactInformation.websiteLink}`}>Visit Website</a></li>}
                                        </ul>
                                    </div>
                                    <div className="mt-14">
                                        <a href={`mailto:${team.contactInformation.email}`} className="primary-button text-white">Send an Email</a>
                                        <a href={`tel:${team.contactInformation.phoneNumber}`} className="bg-transparent text-black border py-2 px-4 rounded-md border-black">Call</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 mt-4">
                            <h3 className="h4 mb-4">About {team.name}</h3>
                            <PortableText
                                value={team?.about}
                            />
                        </div>
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
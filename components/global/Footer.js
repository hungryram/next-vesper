import urlFor, { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import useSWR from 'swr'
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import Styles from "../../styles/footer.module.css"


export default function Footer() {

    const fetcher = (...args) => sanityRes.fetch(...args)
    const profile = groq`
    {
       'profileSettings': *[_type == 'profileSettings'][0],
       'appearances': *[_type == 'appearances'][0]
    }
    `

    const { data, error } = useSWR(profile, fetcher);

    if (error) return "An error has occurred.";
    if (!data) return "Loading...";
    return (
        <footer className={Styles.footer}>
            <div className="section">
                <div className="container">
                    <div className="mx-6 py-10 text-left">
                        <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="relative">
                                {data.appearances.footer.footerLogo ?
                                    <div>
                                        <Image
                                            src={urlFor(data.appearances.footer.footerLogo).url()}
                                            width="200"
                                            height="50"
                                            objectFit="contain"
                                            alt={data.profileSettings.company_name}
                                        />
                                    </div>
                                    :
                                    <h3>{data.profileSettings.company_name}</h3>
                                }

                            </div>
                            <div>
                                <h3 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">Contact Info</h3>
                                <ul>
                                    {data.profileSettings.contact_information.phone_number && <li><a href={`tel:${data.profileSettings.contact_information.phone_number}`}>{data.profileSettings.contact_information.phone_number}</a></li>}
                                    {data.profileSettings.contact_information.email && <li><a href={`tel:${data.profileSettings.contact_information.phone_number}`}>{data.profileSettings.contact_information.email}</a></li>}
                                    {data.profileSettings.address.address && <li><a href="">{data.profileSettings.address.address}</a></li>}
                                </ul>
                            </div>
                            <div>
                                <h3 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
                                    Useful links
                                </h3>

                            </div>
                            <div>
                                <h3 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">About</h3>
                                <PortableText
                                    value={data.appearances.footer.footerText}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center p-6">
                <p className="text-sm font-light pt-0">&copy; Copyright {new Date().getFullYear()} &middot; {data.profileSettings.company_name} &middot; Website built by <a href="https://www.hungryram.com/" className="font-bold" target="_blank" rel="noreferrer">Hungry Ram</a></p>
            </div>
        </footer>
    )
}

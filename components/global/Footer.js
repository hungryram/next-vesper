import urlFor, { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import useSWR from 'swr'
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import Styles from "../../styles/footer.module.css"
import Link from "next/link"
import Social from "../templates/Social"

// ICONS
import { AiOutlineMobile, AiOutlinePhone, AiOutlineMail } from "react-icons/ai"
import { MdOutlineLocationOn } from "react-icons/md"


export default function Footer() {

    const fetcher = (...args) => sanityRes.fetch(...args)
    const profile = groq`
    {
        'profileSettings': *[_type == 'profileSettings'][0]{
            contact_information {
                ...
            },
            address {
                ...
            }
        },
        'appearances': *[_type == 'appearances'][0]{
       footer {
        ...,
       quickLinks[]{
                   newTab,
                   linkType,
                   externalUrl,
                   text,
                   internalLink->{
                   title,
                   name,
                   'slug': slug.current,
                   _type
       }
       }
     }
     }
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
                                <Social/>
                            </div>
                            <div>
                                <h3 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">Contact Info</h3>
                                <ul>
                                    {data.profileSettings.contact_information.phone_number && <li><a href={`tel:${data.profileSettings.contact_information.phone_number}`} className="flex items-center"> <AiOutlineMobile className="mr-2 text-xl" />{data.profileSettings.contact_information.phone_number}</a></li>}
                                    {data.profileSettings.contact_information.office_number && <li><a href={`tel:${data.profileSettings.contact_information.office_number}`} className="flex items-center"> <AiOutlinePhone className="mr-2 text-xl" />{data.profileSettings.contact_information.office_number}</a></li>}
                                    {data.profileSettings.contact_information.email && <li><a href={`tel:${data.profileSettings.contact_information.phone_number}`} className="flex items-center"><AiOutlineMail className="mr-2 text-xl" />{data.profileSettings.contact_information.email}</a></li>}
                                    {data.profileSettings.address.address && <li><a href="" className="flex items-center"><MdOutlineLocationOn className="mr-2 text-2xl" />{data.profileSettings.address.address}<br/> {data.profileSettings.address.city} {data.profileSettings.address.state} {data.profileSettings.address.zip_code}</a></li>}
                                </ul>
                            </div>
                            <div>
                                <h3 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">Useful links</h3>
                                <ul>
                                {data.appearances.footer.quickLinks.map((link, i) => {
                                    return (
                                        <li className="" key={i}>
                                        <Link href={(link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) || (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug}`) || (link.externalUrl && `${link.externalUrl}`)}>
                                            <a target={link.newTab && '_blank'} aria-label={link?.name ?? link?.title ?? link.text}>
                                            {link?.name ?? link?.title ?? link.text}
                                            </a>
                                        </Link>
                                </li>
                                    )
                                })}

                                </ul>
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

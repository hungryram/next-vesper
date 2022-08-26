import { useState } from "react";
import useSWR from 'swr'
import Link from "next/link";
import { groq } from "next-sanity"
import { sanityRes } from "../../lib/sanity";
import Image from "next/image"

import { HiOutlineMenuAlt4 } from "react-icons/hi"
import { GrClose } from "react-icons/gr"
import { BiCaretDown } from "react-icons/bi"
import { FaArrowAltCircleRight } from "react-icons/fa"
import { HiPhone } from "react-icons/hi"
import { FaEnvelope } from "react-icons/fa"
import { IconContext } from "react-icons/lib/cjs/iconContext";
import urlFor from "../../lib/sanity";

export default function Navbar() {
    const [active, setActive] = useState(true);

    const [dropdownActive, setDropdownActive] = useState(null);
    const [openMobileNav, setOpenMobileNav] = useState(false)

    const appearance = groq`
    *[_type == 'appearances'][0]
    `

    const { data, error } = useSWR(appearance, query => sanityRes.fetch(query));

    if (error) return "An error has occurred.";
    if (!data) return "Loading...";

    return (
        <>
            <div className="text-gray-300 py-4 text-sm font-light" style={{ backgroundColor: '#1b1a1a' }}>
                <div className="md:px-10">
                    <ul>
                    </ul>
                </div>
            </div>
            <nav
                className="md:flex items-center justify-center md:px-10 md:visible hidden h-22"
                style={{ borderBottom: '1px solid #eee' }}
                onMouseLeave={() => setDropdownActive(null)}
            >
                <div className="flex-1">
                    <Link href="/" className="relative cursor-pointer">
                        <a>
                        <Image
                            src={urlFor(data.branding.logo).url()}
                            width={300}
                            height="100%"
                            objectFit="contain"
                        />
                        </a>
                    </Link>
                </div>
                <ul className="flex-1 items-center text-right md:mr-10 font-bold">
                    {data.sanityAppearances?.header?.mainNav?.items.map((link, i) => {
                        if (link.submenuChild.length > 0) {
                            return (
                                <>
                                    <li className="relative m-2"
                                        onMouseEnter={dropdownActive === link ? () => setDropdownActive(null) : () => setDropdownActive(link)}>
                                        <Link
                                            aria-label={link.internalLink?.name ?? link.internalLink?.title ?? link.text}
                                            target={link?.externalUrl && "_blank"}
                                            key={i}
                                            className="cursor-pointer flex flex-row items-center"
                                        >
                                            <a>{link.internalLink?.name ?? link.internalLink?.title ?? link.text} <BiCaretDown className={`ml-1 text-lg ${dropdownActive === link ? "rotate-180" : "rotate-0"}`} /></a>
                                        </Link>

                                        <ul className={`absolute bottom-0 left-0 translate-y-full bg-white p-2 border text-left w-fit ${dropdownActive === link ? "visible" : "hidden"}`}>
                                            {link.submenuChild.map((sub) => {
                                                return (
                                                    <>
                                                        <li className="whitespace-nowrap">
                                                            <Link
                                                                onClick={() => setDropdownActive(null)}
                                                                href={(sub.internalLink?._type === "post" && `/blog/${sub.internalLink.slug.current}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug.current}`) || (sub.internalLink?._type === "author" && `/authors/${sub.internalLink.slug.current}`) || (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug.current}`) || (sub.externalUrl && `${sub.externalUrl}`)}
                                                                aria-label={sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text}
                                                                target={sub?.externalUrl && "_blank"}
                                                            >{sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text}</Link>
                                                        </li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                </>
                            )
                        }
                        else {
                            return (
                                <>
                                    <li className="inline mx-5">
                                        <Link
                                            href={(link.internalLink?._type === "post" && `/blog/${link.internalLink.slug.current}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug.current}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug.current}`) || (link.internalLink?._type === "pages" && `/${link.internalLink.slug.current}`) || (link.externalUrl && `${link.externalUrl}`)}
                                            aria-label={link.internalLink?.name ?? link.internalLink?.title ?? link.text}
                                            target={link?.externalUrl && "_blank"}
                                        >
                                            {link.internalLink?.name ?? link.internalLink?.title ?? link.text}

                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    })}
                </ul>
            </nav>

            <div className="z-50 relative md:hidden">
                <div className="nav p-4">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <Link href="/">
                                {data.sanityAppearances?.branding?.logo?.asset.url ?
                                    <img src={data.sanityAppearances.branding.logo.asset.url} width={data.sanityAppearances.branding.logoWidth} alt={data.sanityProfileSettings?.company_name} />
                                    :
                                    <h2 className="text-2xl">{data.sanityProfileSettings?.company_name}</h2>
                                }
                            </Link>
                        </div>
                        <div className="flex-1 text-right">
                            <div id="toggle" className="cursor-pointer flex justify-end" onClick={openMobileNav ? () => setOpenMobileNav(false) : () => setOpenMobileNav(true)}>
                                {openMobileNav ?
                                    <IconContext.Provider value={{
                                        size: '20px'
                                    }}>
                                        <GrClose />
                                    </IconContext.Provider>
                                    :
                                    <IconContext.Provider value={{
                                        size: '30px'
                                    }}>
                                        <HiOutlineMenuAlt4 />
                                    </IconContext.Provider>
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className={`absolute bg-white w-full py-4 ${openMobileNav ? "visible" : "hidden"}`}>
                        <ul style={{ listStyle: "none", padding: "0" }} className="mt-5 flex flex-col">
                            {data.sanityAppearances?.header?.mainNav?.items.map((link, i) => {
                                if (link.submenuChild.length > 0) {
                                    return (
                                        <>
                                            <li className="relative mx-2 my-1" onClick={dropdownActive === link ? () => setDropdownActive(null) : () => setDropdownActive(link)}>
                                                <Link
                                                    aria-label={link.internalLink?.name ?? link.internalLink?.title ?? link.text}
                                                    target={link?.externalUrl && "_blank"}
                                                    key={i}
                                                    className="cursor-pointer flex flex-row items-center"
                                                    onClick={() => setOpenMobileNav(false)}
                                                >
                                                    {link.internalLink?.name ?? link.internalLink?.title ?? link.text} <BiCaretDown className={`ml-1 text-lg ${dropdownActive === link ? "rotate-180" : "rotate-0"}`} />
                                                </Link>

                                                <ul className={`relative w-full bg-white p-2 border text-left w-fit ${dropdownActive === link ? "visible" : "hidden"}`}>
                                                    {link.submenuChild.map((sub) => {
                                                        return (
                                                            <>
                                                                <li className="block mx-2 my-1">
                                                                    <Link
                                                                        onClick={() => setOpenMobileNav(false)}
                                                                        href={(sub.internalLink?._type === "post" && `/blog/${sub.internalLink.slug.current}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug.current}`) || (sub.internalLink?._type === "author" && `/authors/${sub.internalLink.slug.current}`) || (sub.externalUrl && `${sub.externalUrl}`)}
                                                                        aria-label={sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text}
                                                                        target={sub?.externalUrl && "_blank"}
                                                                    >{sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text}</Link>
                                                                </li>
                                                            </>
                                                        )
                                                    })}
                                                </ul>
                                            </li>
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                            <Link
                                                onClick={() => setOpenMobileNav(false)}
                                                className="mx-2 my-1 block"
                                                href={(link.internalLink?._type === "post" && `/blog/${link.internalLink.slug.current}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug.current}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug.current}`) || (link.externalUrl && `${link.externalUrl}`)}
                                                aria-label={link.internalLink?.name ?? link.internalLink?.title ?? link.text}
                                                target={link?.externalUrl && "_blank"}
                                            >
                                                {link.internalLink?.name ?? link.internalLink?.title ?? link.text}

                                            </Link>
                                        </>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

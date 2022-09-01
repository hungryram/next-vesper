import { useState } from "react";
import useSWR from 'swr'
import Link from "next/link";
import { groq } from "next-sanity"
import { sanityRes } from "../../lib/sanity";
import Image from "next/image"

import { HiOutlineMenuAlt4 } from "react-icons/hi"
import { GrClose } from "react-icons/gr"
import { BiCaretDown } from "react-icons/bi"
import { IconContext } from "react-icons/lib/cjs/iconContext";
import urlFor from "../../lib/sanity";

export default function Navbar() {
    const [active, setActive] = useState(true);

    const [dropdownActive, setDropdownActive] = useState(null);
    const [openMobileNav, setOpenMobileNav] = useState(false)

    const appearance = groq`
    {
        'profileSettings': *[_type == 'profileSettings'][0],
        'appearances': *[_type == 'appearances'][0]{
            'branding': branding {
                logo,
                logoWidth
            },
            'header': header {
                '': mainNav->{
                'navItems':items[]{
                  'subMenu':subMenu[]{
                  newTab,
                  linkType,
                  externalUrl,
                  text,
                  internalLink->{
                  title,
                  'slug': slug.current,
                  _type
            }
            },
                  linkType,
                  externalUrl,
                  text,
                  newTab,
                  internalLink->{
                  title,
                  'slug': slug.current,
                  _type
                }
                }
              }
              }
        }
     }
    `

    const { data, error } = useSWR(appearance, query => sanityRes.fetch(query));

    if (error) return "An error has occurred.";
    if (!data) return "Loading...";

    const desktopMenuParentItems = `relative inline-block m-2 text-md`

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
                                src={urlFor(data.appearances.branding.logo).url()}
                                width={data.appearances.branding.logoWidth}
                                height="100%"
                                objectFit="contain"
                                alt={data.profileSettings.company_name}
                            />
                        </a>
                    </Link>
                </div>
                <ul className="flex-1 items-center text-right md:mr-10">
                    {data.appearances?.header?.navItems.map((link, i) => {

                        const menuLinks = (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) || (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug}`) || (link.externalUrl && `${link.externalUrl}`)


                        if (link.subMenu?.length > 0) {

                            return (
                                <li 
                                    key={i}
                                    className={desktopMenuParentItems}
                                    onMouseEnter={dropdownActive === link ? () => setDropdownActive(null) : () => setDropdownActive(link)}>
                                    <Link
                                        href="/"
                                        target={link?.externalUrl && "_blank"}
                                        rel={link?.externalUrl && "noreferrer"}
                                        aria-label={link.internalLink?.name ?? link.internalLink?.title ?? link.text}
                                    >
                                        <a className="cursor-pointer flex flex-row items-center" >
                                            {link.internalLink?.name ?? link.internalLink?.title ?? link.text} <BiCaretDown className={`ml-1 text-lg ${dropdownActive === link ? "rotate-180" : "rotate-0"}`} />
                                        </a>
                                    </Link>

                                    <ul className={`absolute bottom-0 left-0 translate-y-full bg-white p-2 border text-left w-fit z-50 ${dropdownActive === link ? "visible" : "hidden"}`}>
                                        {link.subMenu.map((sub, i) => {

                                            const subMenuLinks = (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) || (sub.internalLink?._type === "author" && `/authors/${sub.internalLink.slug}`) || (sub.externalUrl && `${sub.externalUrl}`)

                                            return (
                                                <>
                                                    <li className="whitespace-nowrap" key={i}>
                                                        <Link href={subMenuLinks}>
                                                            <a target={sub.newTab && '_blank'} aria-label={sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text} rel={sub?.externalUrl && "noreferrer"} onClick={() => setDropdownActive(null)}>
                                                                {sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </>
                                            )
                                        })}
                                    </ul>
                                </li>
                            )
                        }
                        else {
                            return (
                                <>
                                    <li className={desktopMenuParentItems} key={i}>
                                        <Link href={menuLinks}>
                                            <a target={link.newTab && '_blank'} aria-label={link?.name ?? link?.title ?? link.text} rel={link?.externalUrl && "noreferrer"}>
                                                {link.text}
                                            </a>
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
                            <Link href="/" className="relative cursor-pointer">
                                <a>
                                    <Image
                                        src={urlFor(data.appearances.branding.logo).url()}
                                        width={data.appearances.branding.logoWidth}
                                        height="100%"
                                        objectFit="contain"
                                        alt={data.profileSettings.company_name}
                                    />
                                </a>
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
                            {data.appearances?.header?.navItems.map((link, i) => {

                                const mobileMenuLinks = (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) || (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug}`) || (link.externalUrl && `${link.externalUrl}`)


                                if (link.subMenu?.length > 0) {
                                    return (
                                        <>
                                            <li key={i} className="relative my-1" onClick={dropdownActive === link ? () => setDropdownActive(null) : () => setDropdownActive(link)}>
                                                <Link href="/">
                                                    <a className="cursor-pointer flex flex-row items-center" onClick={() => setOpenMobileNav(false)}>
                                                    {link.internalLink?.name ?? link.internalLink?.title ?? link.text} <BiCaretDown className={`ml-1 text-lg ${dropdownActive === link ? "rotate-180" : "rotate-0"}`} />
                                                    </a>
                                                </Link>

                                                <ul className={`relative w-full p-2 text-left ${dropdownActive === link ? "visible" : "hidden"}`}>
                                                    {link.subMenu.map((sub) => {

                                                        const subMenuLinks = (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) || (sub.internalLink?._type === "author" && `/authors/${sub.internalLink.slug}`) || (sub.externalUrl && `${sub.externalUrl}`)

                                                        return (
                                                            <>
                                                                <li className="block my-1">
                                                                    <Link href={subMenuLinks}>
                                                                        <a aria-label={sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text} target={sub?.newTab && "_blank"} rel={sub?.externalUrl && "noreferrer"} onClick={() => setOpenMobileNav(false)}>
                                                                        {sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text}
                                                                        </a>
                                                                    </Link>
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
                                        <li key={i}>
                                            <Link className="my-1 block" href={mobileMenuLinks}>
                                                <a rel={link?.externalUrl && "noreferrer"} aria-label={link.internalLink?.name ?? link.internalLink?.title ?? link.text} onClick={() => setOpenMobileNav(false)}>
                                                {link.internalLink?.name ?? link.internalLink?.title ?? link.text}
                                                </a>

                                            </Link>
                                        </li>
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

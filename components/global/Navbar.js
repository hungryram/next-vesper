import { useState } from "react";
import Link from "next/link";

import { HiOutlineMenuAlt4 } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import { BiCaretDown } from "react-icons/bi"
import urlFor from "../../lib/sanity";

import Styles from "../../styles/header.module.css"

export default function Navbar({ logo, company_name, logoWidth, navItems, ctaText, ctaLink }) {

    const [dropdownActive, setDropdownActive] = useState(null);
    const [openMobileNav, setOpenMobileNav] = useState(false)

    const desktopMenuParentItems = `relative inline-block mx-4 text-md`
    return (
        <>
            <nav
                className={Styles.navbar}
                onMouseLeave={() => setDropdownActive(null)}
            >
                <div className="lg:container md:flex items-center justify-center md:px-2 md:visible hidden">
                    <div className="flex-1">
                        <Link href="/" className="relative cursor-pointer">
                            <a>
                                {logo &&
                                    <picture>
                                        <source srcSet={urlFor(logo).url()} type="image" />
                                        <img
                                            src={urlFor(logo).url()}
                                            width={logoWidth}
                                            alt={company_name}
                                        />
                                    </picture>
                                }
                            </a>
                        </Link>
                    </div>
                    <ul className="items-center text-right md:mr-10 justify-end">
                        {navItems?.map((link) => {

                            const menuLinks = (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) || (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug}`) || (link.externalUrl && `${link.externalUrl}`)


                            if (link.subMenu?.length > 0) {

                                return (
                                    <li
                                        key={link._key}
                                        className={desktopMenuParentItems}
                                        onMouseEnter={dropdownActive === link ? () => setDropdownActive(null) : () => setDropdownActive(link)}>
                                        <Link
                                            href="/"
                                            target={link?.externalUrl && "_blank"}
                                            rel={link?.externalUrl && "noreferrer"}
                                            aria-label={link.internalLink?.name ?? link.internalLink?.title ?? link.text}
                                        >
                                            <a className={`cursor-pointer flex flex-row items-center py-10 ${Styles.navItems}`}>
                                                {link.internalLink?.name ?? link.internalLink?.title ?? link.text} <BiCaretDown className="ml-1 text-lg" />
                                            </a>
                                        </Link>

                                        <ul className={`absolute bottom-0 left-0 translate-y-full bg-white p-2 border text-left min-w-[200px] z-50 ${dropdownActive === link ? "visible" : "hidden"}`}>
                                            {link.subMenu.map((sub) => {

                                                const subMenuLinks = (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) || (sub.internalLink?._type === "author" && `/authors/${sub.internalLink.slug}`) || (sub.externalUrl && `${sub.externalUrl}`)

                                                return (
                                                    <>
                                                        <li className="whitespace-nowrap" key={sub._key}>
                                                            <Link href={subMenuLinks}>
                                                                <a target={sub.newTab && '_blank'} aria-label={sub.internalLink?.name ?? sub.internalLink?.title ?? sub.text} rel={sub?.externalUrl && "noreferrer"} onClick={() => setDropdownActive(null)} className="py-1 block">
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
                                        <li className={desktopMenuParentItems} key={link._key}>
                                            <Link href={menuLinks}>
                                                <a target={link.newTab && '_blank'} aria-label={link?.name ?? link?.title ?? link.text} rel={link?.externalUrl && "noreferrer"} className={`md:py-12 ${Styles.navItems}`}>
                                                    {link.text}
                                                </a>
                                            </Link>
                                        </li>
                                    </>
                                )
                            }
                        })}
                        {ctaText &&
                            <li className={desktopMenuParentItems} key="ctaButtonheadernavigation">
                                <Link href={ctaLink}>
                                    <a className="primary-button">
                                        <span>{ctaText}</span>
                                    </a>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>

            <div className={`z-50 absolute left-0 right-0 md:hidden ${Styles.navbar}`}>
                <div className="nav px-4 py-6">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <Link href="/" className="relative cursor-pointer">
                                <a>
                                    {logo &&
                                        <picture>
                                            <source srcSet={urlFor(logo).url()} type="image" />
                                            <img
                                                src={urlFor(logo).url()}
                                                width={logoWidth}
                                                alt={company_name}
                                            />
                                        </picture>
                                    }
                                </a>
                            </Link>
                        </div>
                        <div className="flex-1 text-right">
                            <div id="toggle" className="cursor-pointer flex justify-end" onClick={openMobileNav ? () => setOpenMobileNav(false) : () => setOpenMobileNav(true)}>
                                {openMobileNav ?
                                        <AiOutlineClose className="text-xl text-white"/>
                                    :
                                        <HiOutlineMenuAlt4 className="text-xl text-white"/>
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className={`absolute bg-white w-full py-4 ${openMobileNav ? "visible" : "hidden"}`}>
                        <ul style={{ listStyle: "none", padding: "0" }} className="mt-5 flex flex-col">
                            {navItems?.map((link) => {

                                const mobileMenuLinks = (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) || (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) || (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) || (link.internalLink?._type === "author" && `/authors/${link.internalLink.slug}`) || (link.externalUrl && `${link.externalUrl}`)


                                if (link.subMenu?.length > 0) {
                                    return (
                                        <>
                                            <li key={link._key} className="relative my-1" onClick={dropdownActive === link ? () => setDropdownActive(null) : () => setDropdownActive(link)}>
                                                <Link href="#">
                                                    <a className="cursor-pointer flex flex-row items-center" href="#" onClick={() => setOpenMobileNav(true)}>
                                                        {link.internalLink?.name ?? link.internalLink?.title ?? link.text} <BiCaretDown className="ml-1 text-lg" />
                                                    </a>
                                                </Link>

                                                <ul className={`relative block w-full bg-white p-2 border text-left ${dropdownActive === link ? "visible" : "hidden"}`}>
                                                    {link.subMenu.map((sub) => {

                                                        const subMenuLinks = (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) || (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) || (sub.internalLink?._type === "author" && `/authors/${sub.internalLink.slug}`) || (sub.externalUrl && `${sub.externalUrl}`)

                                                        return (
                                                            <>
                                                                <li className="block my-1" key={sub._key}>
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
                                        <li key={link._key} onClick={() => setOpenMobileNav(false)}>
                                            <Link className="my-1 block" href={mobileMenuLinks}>
                                                <a rel={link?.externalUrl && "noreferrer"} aria-label={link.internalLink?.name ?? link.internalLink?.title ?? link.text}>
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
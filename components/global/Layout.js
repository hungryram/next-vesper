import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from 'next/head'
import useSWR from "swr"
import {groq} from "next-sanity"
import urlFor, { sanityRes } from "../../lib/sanity";

export default function Layout({ children }) {

    const fetcher = (url) => sanityRes.fetch(url)

    const appearances = groq`
    {
       'appearances': *[_type == 'appearances'][0],
       'homeDesign': *[_type == 'homeDesign'][0]
    }
    `

    const { data, error } = useSWR(appearances, fetcher)
    if (error) return "An error has occurred.";
    if (!data) return "Loading...";
    return (
        <>
            <Head>
                <style>
                    {`
                        :root {

                            --primary-accent: ${data.appearances.mainColors?.primaryColor.hex};

                            --footer-background-color: ${data.appearances.footer.footerBackground.color.hex};
                            --footer-header-color: ${data.appearances.footer.headerColor.hex};
                            --footer-text-color: ${data.appearances.footer.textColor.hex};
                            --primary-button-background: ${data.appearances.mainColors.buttonBackgroundColor.hex};
                            --primary-button-text: ${data.appearances.mainColors.buttonTextColor.hex};

                            --header-background-color: ${data.appearances.header?.headerColor?.hex ? data.appearances.header?.headerColor?.hex : 'transparent'};
                            --header-navigation-color: ${data.appearances.header.navColor.hex};
                        
                        }
                    `}
                </style>
            </Head>
            <main>
                {children}
            </main>
        </>
    )
}

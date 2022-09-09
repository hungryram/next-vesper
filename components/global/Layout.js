import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from 'next/head'
import useSWR from "swr"
import {groq} from "next-sanity"
import urlFor, { sanityRes } from "../../lib/sanity";
import Loading from "../templates/Loading";

export default function Layout({ children }) {

    const fetcher = (url) => sanityRes.fetch(url)

    const appearances = groq`
    {
        'appearances': *[_type == 'appearances'][0]{
        'loader': branding.loadingLogo.asset->url,
        'loaderColor': branding.loadingBackground.hex,
        'loaderImage': branding.loadingLogo.asset->url,
        'navColor': header.navColor.hex,
        'navBgColor': header.headerColor.hex,
        'primaryButtonBg': mainColors.buttonBackgroundColor.hex,
        'primaryButtonText': mainColors.buttonTextColor.hex,
        'footerHeader': footer.headerColor.hex,
        'footerText': footer.textColor.hex,
        'footerBg': footer.footerBackground.color.hex,
        'primaryAccent': mainColors.primaryColor.hex
      },
      }
    `

    const { data, error } = useSWR(appearances, fetcher)
    if (error) return "undefined";
    if (!data) return <Loading />;

    const bgLoader = data.appearances?.loaderImage
    return (
        <>
            <Head>
                <style>
                    {`
                        :root {

                            --primary-accent: ${data.appearances.mainColors?.primaryColor.hex};

                            --footer-background-color: ${data.appearances?.footerBg};
                            --footer-header-color: ${data.appearances?.footerHeader};
                            --footer-text-color: ${data.appearances?.footerText};
                            --primary-button-background: ${data.appearances?.primaryButtonBg};
                            --primary-button-text: ${data.appearances?.primaryButtonText};

                            --header-background-color: ${data.appearances?.navBgColor ? data.appearances?.navBgColor : 'transparent'};
                            --header-navigation-color: ${data.appearances?.navColor};

                            --loading-background-color: ${data.appearances?.loaderColor};
                            --loading-image: url(${bgLoader});
                        
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

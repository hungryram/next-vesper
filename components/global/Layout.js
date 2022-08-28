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
       'homeDesign': *[_type == 'homeDesign'][0]{
        'banner': pageBuilder[@._type == 'banner'][]{
            'headerHex': textColor.headerColor.hex,
            'textHex': textColor.textColor.hex,
          }
       }
    }
    `

    const { data, error } = useSWR(appearances, fetcher)
    if (error) return "An error has occurred.";
    if (!data) return "Loading...";
    console.log(data.homeDesign.banner)
    return (
        <>
            <Head>
                <style>
                    {`
                        :root {
                            --footer-background-color: ${data.appearances.footer.footerBackground.color.hex};
                            --footer-header-color: ${data.appearances.footer.headerColor.hex};
                            --footer-text-color: ${data.appearances.footer.textColor.hex};
                        
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

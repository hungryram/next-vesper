import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from 'next/head'
import useSWR from "swr"
import {groq} from "next-sanity"
import { sanityRes } from "../../lib/sanity";

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
    console.log(data.appearances.footer)
    return (
        <>
            <Head>
                <style>
                    {`
                        :root {
                            --footer-background-color: ${data.appearances.footer.footerBackground.color.hex};
                            --footer-header-color: ${data.appearances.footer.headerColor.hex};
                            --footer-text-color: ${data.appearances.footer.textColor.hex};
                            
                            // HOME SECTIONS
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

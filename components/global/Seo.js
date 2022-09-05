import { groq } from "next-sanity";
import Head from "next/head";
import useSWR from "swr"
import { sanityRes } from "../../lib/sanity";



export default function Seo({ title, description, image, ogType = "website", robotIndex = "index,follow" }) {

    const fetcher = (url) => sanityRes.fetch(url)

    const profile = groq`
    {
        'profileSettings': *[_type == 'profileSettings'][0]
    }
    `

    const { data, error } = useSWR(profile, fetcher);
    if (error) return "An error has occurred.";
    if (!data) return "Loading...";

    const defaultTitle = data.profileSettings.company_name
    const DOMAIN = data.profileSettings.seo.websiteName || ''
    const DEFAULT_OG_IMAGE = data.profileSettings.seo.defaultImageBanner || ''
    return (
        <Head>
            <title key="title">{title || defaultTitle}</title>
            <meta name="description" content={description} />
            <meta key="og_type" property="og:type" content={ogType} />
            <meta key="og_title" property="og:title" content={title} />
            <meta key="og_description" property="og:description" content={description} />
            <meta key="og_locale" property="og:locale" content="en_US" />
            <meta key="og_site_name" property="og:site_name" content={data.profileSettings.company_name} />
            <meta name="robots" content={robotIndex} />
            <meta
                key="og_image"
                property="og:image"
                content={image ?? DEFAULT_OG_IMAGE}
            />
            <meta
                key="og_image:alt"
                property="og:image:alt"
                content={title}
            />
            <meta key="og_image:width" property="og:image:width" content="1200" />
            <meta key="og_image:height" property="og:image:height" content="630" />
            <meta
                key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            {data.profileSettings.twitterHandle &&
                <meta
                    key="twitter:site"
                    name="twitter:site"
                    content={data.profileSettings.twitterHandle}
                />
            }
            {data.profileSettings.twitterHandle &&
                <meta
                    key="twitter:creator"
                    name="twitter:creator"
                    content={data.profileSettings.twitterHandle}
                />
            }
            <meta
                key="twitter:title"
                property="twitter:title"
                content={title || defaultTitle}
            />
            <meta
                key="twitter:description"
                property="twitter:description"
                content={description}
            />


        </Head>
    );
}
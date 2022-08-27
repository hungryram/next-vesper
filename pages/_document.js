import { Html, Head, Main, NextScript } from 'next/document'
import { groq } from "next-sanity"

export default function Document() {

    const profile = groq`
    *[_type == 'profileSettings'][0]{
        company_name
    }
    `

    return (
        <Html>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
                <link rel="preload" href={profile} as="fetch" crossorigin="anonymous" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
import { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import useSWR from 'swr'


export default function Footer() {

    const fetcher = (...args) => sanityRes.fetch(...args)


    const profile = groq`
    *[_type == 'profileSettings'][0]{
        company_name
    }
    `

    const { data, error } = useSWR(profile, fetcher, {
        fallback: false
    });

      if (error) return "An error has occurred.";
      if (!data) return "Loading...";

    return (
        <footer className="text-center lg:text-left bg-gray-100 text-gray-600">
            <div className="container text-center">
                <h1 className="text-8xl">{data.company_name}</h1>
            </div>
        </footer>
    )
}

import { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import useSWR from 'swr'

const fetcher = async (url) => await sanityRes.fetch(url)

export default function Footer() {


    const profile = groq`
    *[_type == 'profileSettings'][0]
    `


    const { data, error } = useSWR(profile, fetcher);

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

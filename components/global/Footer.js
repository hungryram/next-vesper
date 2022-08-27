import { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import useSWR from 'swr'
import React from 'react'


export default function Footer() {

    const fetcher = (...args) => sanityRes.fetch(...args).then(res => res.json())


    const profile = groq`
    *[_type == 'profileSettings'][0]{
        company_name
    }
    `
    
    const { data, error } = useSWR(`https://041e5s03.api.sanity.io/v2021-10-21/data/query/production?query=%20%20%20%20*%5B_type%20%3D%3D%20%27profileSettings%27%5D%5B0%5D`, fetcher);

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

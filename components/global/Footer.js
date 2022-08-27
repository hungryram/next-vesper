import { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import useSWR from 'swr'
import React from 'react'


export default function Footer() {

    const fetcher = (...args) => sanityRes.fetch(...args)


    const profile = groq`
    *[_type == 'profileSettings'][0]{
        company_name
    }
    `
    
    const { data, error } = useSWR(groq`*[_type == "profileSettings"][0]`, fetcher);

      if (error) return "An error has occurred.";
      if (!data) return "Loading...";
console.log(data)
    return (
        <footer className="text-center lg:text-left bg-gray-100 text-gray-600">
            <div className="container text-center">
                <h1 className="text-8xl">{data.company_name}</h1>
            </div>
        </footer>
    )
}

import { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import useSWR from 'swr'


export default function Footer() {

    const fetcher = (...args) => fetch(...args).then((res) => res.json());


    const profile = groq`
    *[_type == 'profileSettings'][0]{
        company_name
    }
    `


    const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/posts/1`, fetcher);

      if (error) return "An error has occurred.";
      if (!data) return "Loading...";

    return (
        <footer className="text-center lg:text-left bg-gray-100 text-gray-600">
            <div className="container text-center">
                <h1 className="text-8xl">{data.title}</h1>
            </div>
        </footer>
    )
}

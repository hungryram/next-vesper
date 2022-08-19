import { sanityRes } from "../../lib/sanity"
import {groq} from 'next-sanity'

export default function Footer({ res }) {
    console.log(res)
  return (
    <div>
        <p></p>
    </div>
  )
}

const query = groq`
*[_type == 'profileSettings']{
    company_name
}
`

export async function getStaticProps() {
    const res = await sanityRes.fetch(query)
  
    return {
      props: {
        res
      }
    }
  }
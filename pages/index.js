import { sanityRes } from '../lib/sanity'
import { groq } from 'next-sanity'

export default function Home({ res }) {
  return (
    <div>
        <h1>{res.company}</h1>
        {/* Trying to display company name */}
    </div>
  )
}

const profileSettings = groq`
*[_type == 'profileSettings']{
  'company': company_name
}
`

export async function getStaticProps() {
  const res = await sanityRes.fetch(profileSettings)

  return {
    props: {
      res
    }
  }
}
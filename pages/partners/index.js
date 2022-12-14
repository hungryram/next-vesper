import { sanityRes } from "../../lib/sanity"
import { groq } from "next-sanity"
import Cards from "../../components/templates/Cards"
import Seo from "../../components/global/Seo"
import Header from "../../components/templates/Header"

const queryPartner = groq`
*[_type == 'partners']{
    name,
    image,
    'slug': slug.current,
    _id
}
`

export async function getStaticProps() {
    const res = await sanityRes.fetch(queryPartner)

    return {
        props: {
            res
        }
    }
}

export default function ParterIndex({ res }) {
  return (
    <>
    <Seo
        title="View Partners"
        description="View our partners"
    />
    <Header
        title="Partners"
    />
        <div className="section">
        <div className="container">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {res.map((node) => {
                return (
                    <Cards
                        name={node.name}
                        image={node.image}
                        link={'/partners/' + node.slug}
                        key={node._id}
                    />
                )
            })}
            </div>
        </div>
    </div>
    </>
  )
}

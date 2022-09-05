import { sanityRes } from "../../lib/sanity"
import { groq } from "next-sanity"
import Cards from "../../components/templates/Cards"
import Header from "../../components/templates/Header"
import Seo from "../../components/global/Seo"

const queryLocation = groq`
*[_type == 'locations']{
    name,
    image,
    'slug': slug.current,
    _id
}
`

export async function getStaticProps() {
    const res = await sanityRes.fetch(queryLocation)

    return {
        props: {
            res
        }
    }
}

export default function LocationIndex({ res }) {
  return (
    <>
    <Seo
        title="View our Locations"
        description="Locations"
    />
    <Header
        title={`Location${res.length < 1 ? 's' : ''}`}
    />
        <div className="section">
        <div className="container">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {res.map((node) => {
                return (
                    <Cards
                        name={node?.name}
                        image={node.image}
                        link={'/locations/' + node.slug}
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

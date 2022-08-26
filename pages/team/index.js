import { sanityRes } from "../../lib/sanity"
import { groq } from "next-sanity"
import Cards from "../../components/templates/Cards"

const queryTeam = groq`
*[_type == 'team']{
    name,
    image,
    'slug': slug.current,
    _id
}
`

export async function getStaticProps() {
    const res = await sanityRes.fetch(queryTeam)

    return {
        props: {
            res
        }
    }
}

export default function TeamIndex({ res }) {
  return (
    <div className="section">
        <div className="container">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {res.map((node) => {
                return (
                    <Cards
                        name={node.name}
                        image={node.image}
                        link={'/team/' + node.slug.current}
                        key={node._id}
                    />
                )
            })}
            </div>
        </div>
    </div>
  )
}

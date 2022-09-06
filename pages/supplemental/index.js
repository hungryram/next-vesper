import { sanityRes } from "../../lib/sanity"
import Header from "../../components/templates/Header"
import { groq } from "next-sanity"
import ListingCard from "../../components/templates/ListingCard"

const listing = groq`
*[_type == 'listings']{
    address,
    city,
    state,
    shortTitle,
    propType,
    details {
    squareFootage,
    bedrooms,
    bathrooms,
  },
  'slug': slug.current,
  'thumbnail': gallery.images[0]
  }
`

export async function getStaticProps() {
    const supplementalListings = await sanityRes.fetch(listing)

    return {
        props: {
            listing: supplementalListings
        }
    }
}

export default function index({ listing }) {
  return (
    <>
    <Header
        title="Supplemental Listings"
    />
        <div className="section">
        <div className="container">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {listing.map((node) => {
                    return (
                        <ListingCard
                            price={node.price}
                            address={node.address}
                            propType={node.propType}
                            shortTitle={node.shortTitle}
                            link={`/supplemental/${node.slug}`}
                            bedrooms={node.details.bedrooms}
                            bathrooms={node.details.bathrooms}
                            squareFootage={node.details.squareFootage}
                            key={node._id}
                            image={node.thumbnail}
                        />
                    )
                })}
            </div>
        </div>
    </div>
    </>
  )
}

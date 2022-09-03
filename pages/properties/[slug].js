import { idxConnection } from "../../lib/client"
const slugify = require('slugify')

export async function getStaticPaths() {

    const response = await fetch('https://www.idxhome.com/api/v1/client/listings.json?fields=id,listingAgent,listingStatus,listPrice,status,description,squareFeet,bedrooms,fullBathrooms,partialBathrooms,address,latitude,longitude,photos', idxConnection)
    const data = await response.json()

    return {
        paths: data.results.map((listing) => {
            return {
                params: {
                    slug: listing.id,
                }
            }
        }),
        fallback: false
    }
}

// START GETSTATICPROPS

export async function getStaticProps(context) {

    const response = await fetch(`https://www.idxhome.com/api/v1/client/listing/${context.params.slug}.json`, idxConnection)
    const data = await response.json()
    return {
        props: {
            idxData: data,
        }
    }
}




export default function PropertiesDetail({ idxData }) {
console.log(idxData)
  return (
    <div className="section">
        <div className="container">
        <h1 className="text-3xl">{idxData.address.houseNumber}</h1>
        <h1 className="text-xl">{idxData.description}</h1>
        <p className="text-3xl text-blue-400">test</p>
        </div>
    </div>
  )
}

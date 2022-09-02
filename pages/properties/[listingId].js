import { idxConnection } from "../../lib/client"
const slugify = require('slugify')


export async function getStaticPaths() {

    const response = await fetch('https://www.idxhome.com/api/v1/client/listings.json?fields=id,listingAgent,listingStatus,listPrice,status,description,squareFeet,bedrooms,fullBathrooms,partialBathrooms,address,latitude,longitude,photos', idxConnection)
    const data = await response.json()

    const paths = data.results.map(listing => {
        return {
            params: {
                listingId: `${listing.id}`
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { listingId } = context.params
    const response = await fetch(`https://www.idxhome.com/api/v1/client/listing/${listingId}.json`, idxConnection)
    const data = await response.json()
    return  {
        props: {
            idxData: data
        }
    }
}




export default function PropertiesDetail({ idxData }) {

  return (
    <div>{idxData.address.houseNumber}</div>
  )
}

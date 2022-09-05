import Header from "../../components/templates/Header"
import Sidebar from "../../components/templates/Sidebar"
import { idxConnection } from "../../lib/client"
const slugify = require('slugify')

export async function getStaticPaths() {

    const response = await fetch('https://www.idxhome.com/api/v1/client/listings.json?fields=id,listingAgent,listingStatus,listPrice,status,description,squareFeet,bedrooms,fullBathrooms,partialBathrooms,address,latitude,longitude,photos', idxConnection)
    const data = await response.json()

    return {
        paths: data.results.map((listing) => {
            return {
                params: {
                    slug: [listing.id, slugify(`${listing.address.houseNumber}-${listing.address.streetName}`, { lower: true })]
                }
            }
        }),
        fallback: false
    }
}

// START GETSTATICPROPS

export async function getStaticProps(context) {
    const response = await fetch(`https://www.idxhome.com/api/v1/client/listing/${context.params.slug[0]}.json`, idxConnection)
    const data = await response.json()
    return {
        props: {
            idxData: data,
        }
    }
}




export default function PropertiesDetail({ idxData }) {
    return (
        <>
            <Header
                title={idxData.address.externalDisplay}
            />
            <div className="section">
                <div className="container">
                    <div className="md:flex gap-10">
                        <div className="md:w-2/3">
                            <div className="content">
                            <h1 className="text-3xl">{idxData.address.houseNumber}</h1>
                            <div>{idxData.description}</div>
                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

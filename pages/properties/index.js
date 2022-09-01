import React from 'react'
import ListingCard from '../../components/templates/ListingCard'
import { requestOptions } from '../../lib/client'
import { formatPrice } from '../../lib/client'

export async function getServerSideProps() {
    const listingData = await fetch('https://www.idxhome.com/api/v1/client/listings.json?fields=id,listingAgent,listingStatus,listPrice,status,description,squareFeet,bedrooms,fullBathrooms,partialBathrooms,address,latitude,longitude,photos', requestOptions)
    const data = await listingData.json()

    const listings = await Promise.all(data.results.map(async (listing) => {
        const footage = JSON.stringify(listing.squareFeet)
        const listingObject = {
            _id: listing.id,
            city: listing.address.city,
            state: listing.address.state,
            zipCode: listing.address.postalCode,
            listing_agent: listing.listingAgent,
            externalDisplay: listing.address.externalDisplay,
            price: listing.listPrice,
            details: {
                description: listing.description,
                squareFeet: listing.squareFeet,
                bedrooms: listing.bedrooms,
                fullBathrooms: listing.fullBathrooms,
                partialBathrooms: listing.partialBathrooms,
                latitude: listing.latitude,
                longitude: listing.longitude,
            },
        }
        return listingObject
    }))

    
    return {
        props: {
            listingInfo: JSON.parse(JSON.stringify(listings))
        }
    }
}

export default function PropertyIndex({ listingInfo }) {
    console.log(listingInfo)
  return (
    <div className="section">
        <div className="container">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {listingInfo.map((listing) => {
                    return (
                        <ListingCard
                            key={listing._id}
                            idxAddress={listing.externalDisplay}
                            bedrooms={listing.details.bedrooms}
                            bathrooms={listing.details.fullBathrooms}
                            squareFootage={listing.details.squareFeet}
                            price={formatPrice.format(listing.price)}
                        />
                    )
                })}
            </div>
        </div>
    </div>
  )
}

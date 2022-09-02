import React from 'react'
import ListingCard from '../../components/templates/ListingCard'
import { idxConnection } from '../../lib/client'
import { formatPrice } from '../../lib/client'
const slugify = require('slugify')

const fetchData = async (endpoint) => {
    const res = await fetch(endpoint, idxConnection)
    const data = await res.json();
    return data.results
}

export async function getServerSideProps() {
    const listingData = await fetch('https://www.idxhome.com/api/v1/client/listings.json?fields=id,listingAgent,listingStatus,listPrice,status,description,squareFeet,bedrooms,fullBathrooms,partialBathrooms,address,latitude,longitude,photos', idxConnection)
    const data = await listingData.json()

    const listings = await Promise.all(data.results.map(async (listing) => {
        const photosEndpoint = listing.photos.links.filter(link => link.rel === 'self').map(e => e.href).toString()+`?fields=largeImageUrl,displayOrder`
        const photoData = await fetchData(photosEndpoint)
        const featuredImage = photoData.filter(photo => photo.displayOrder === 0)[0]
        const photos = photoData.map(url => ( url.largeImageUrl ))
        const listingObject = {
            slug: slugify(`${listing.address.houseNumber}-${listing.address.streetName}`, {lower: true}),
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
            photos: {
                featuredImage: featuredImage.largeImageUrl,
                gallery: photos,
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
                            idxImage={listing.photos.featuredImage}
                            link={'/properties/' + listing._id}
                        />
                    )
                })}
            </div>
        </div>
    </div>
  )
}

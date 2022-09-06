import { groq } from 'next-sanity'
import React from 'react'
import Header from '../../components/templates/Header'
import ListingCard from '../../components/templates/ListingCard'
import { idxConnection } from '../../lib/client'
import { formatPrice } from '../../lib/client'
import urlFor, { sanityRes } from '../../lib/sanity'
const slugify = require('slugify')

const fetchData = async (endpoint) => {
    const res = await fetch(endpoint, idxConnection)
    const data = await res.json();
    return data.results
}

export async function getServerSideProps() {
    const listingData = await fetch('https://www.idxhome.com/api/v1/client/listings.json?fields=id,listingAgent,listingStatus,listPrice,status,description,squareFeet,bedrooms,fullBathrooms,partialBathrooms,address,latitude,longitude,photos', idxConnection)
    const data = await listingData.json()

    const listingQuery = groq`
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
    const manualListings = await sanityRes.fetch(listingQuery)

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
            listingInfo: JSON.parse(JSON.stringify(listings)),
            manualListings
        }
    }
}

export default function PropertyIndex({ listingInfo, manualListings }) {
    console.log(manualListings)
  return (
    <>
    <Header
        title="Properties"
    />
        <div className="section">
        <div className="container">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {manualListings.map((node) => {
                    return (
                        <ListingCard
                            price={node.price}
                            address={node.address}
                            propType={node.propType}
                            shortTitle={node.shortTitle}
                            link={`/properties/${node.slug}`}
                            bedrooms={node.details.bedrooms}
                            bathrooms={node.details.bathrooms}
                            squareFootage={node.details.squareFootage}
                            key={node._id}
                            image={node.thumbnail}
                        />
                    )
                })}
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
                            link={`/properties/${listing._id}/${listing.slug}`}
                        />
                    )
                })}
            </div>
        </div>
    </div>
    </>
  )
}

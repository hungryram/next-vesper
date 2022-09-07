import { idxConnection } from "../../lib/client"
import Image from "next/image"
import { useState } from "react"
const slugify = require('slugify')
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Pagination, Navigation } from 'swiper'
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import Swiper styles
import 'swiper/css';

// ICONS
import ListingDetail from "../../components/templates/listingDetail"
import ListingSidebar from "../../components/templates/ListingSidebar"

export async function getStaticPaths() {

    const response = await fetch('https://www.idxhome.com/api/v1/client/listings.json?fields=id,address', idxConnection)
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
    const listingDetail = fetch(`https://www.idxhome.com/api/v1/client/listing/${context.params.slug[0]}.json`, idxConnection).then(value => value.json())
    const listingGallery = fetch(`https://www.idxhome.com/api/v1/client/listing/${context.params.slug[0]}/photos.json?fields=largeImageUrl,smallImageUrl`, idxConnection).then(value => value.json())
    const listingPropType = fetch(`https://www.idxhome.com/api/v1/client/listing/${context.params.slug[0]}/propertyType.json`, idxConnection).then(value => value.json())
    const listingFetchTour = fetch(`https://www.idxhome.com/api/v1/client/listing/${context.params.slug[0]}/virtualTour.json`, idxConnection).then(value => value.json())

    const [listingInfo, listGallery, listProp, listingVirtualTour] = await Promise.all([listingDetail, listingGallery, listingPropType, listingFetchTour])

    return {
        props: {
            listingInfo,
            listGallery,
            listProp,
            listingVirtualTour
        }
    }
}


export default function PropertiesDetail({ listingInfo, listGallery, listProp, listingVirtualTour }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <div className="pt-32 pb-0">
                <div className="container">
                    <h1 className="text-slate-800 md:text-2xl font-medium">{listingInfo.address.externalDisplay}</h1>
                    <div className="gallery mt-10">
                        <Swiper
                            modules={[Thumbs, Pagination, Navigation]}
                            thumbs={{ swiper: thumbsSwiper }}
                            navigation={true}
                        >
                            {listGallery?.results.map((node, i) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <div className="relative w-full md:h-[50rem] h-96">
                                            <Image
                                                src={node.largeImageUrl}
                                                layout="fill"
                                                objectFit="cover"
                                                placeholder="blur"
                                                blurDataURL={node.smallImageUrl}
                                            />
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                        <Swiper
                            modules={[Thumbs]}
                            watchSlidesProgress
                            onSwiper={setThumbsSwiper}
                            slidesPerView={8}
                            spaceBetween={10}

                        >
                            {listGallery?.results.map((node, i) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <Image 
                                            src={node.smallImageUrl} 
                                            alt=""
                                            width={150}
                                            height={100}
                                            objectFit="cover"
                                        />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="md:flex gap-10">
                        <div className="md:w-2/3">
                            <div>
                                <ListingDetail
                                    propType={listProp.label}
                                    address={listingInfo.address.externalDisplay}
                                    mlsNumber={listingInfo.listingNumber}
                                    beds={listingInfo.bedrooms}
                                    squareFeet={listingInfo.squareFeet}
                                    status={listingInfo.status}
                                    mlsDescription={listingInfo.description}
                                    mlsBaths={listingInfo.fullBathrooms}
                                    partialBaths={listingInfo.partialBathrooms}
                                    city={listingInfo.address.city}
                                    state={listingInfo.address.state}
                                    price={listingInfo.listPrice}
                                />
                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <ListingSidebar 
                                name={listingInfo.listingAgent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

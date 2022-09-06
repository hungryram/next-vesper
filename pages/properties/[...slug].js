import Sidebar from "../../components/templates/Sidebar"
import { formatPrice, idxConnection } from "../../lib/client"
import Image from "next/image"
import Styles from "../../styles/listing.module.css"
import { useState } from "react"
const slugify = require('slugify')
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Pagination, Navigation } from 'swiper'
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import Swiper styles
import 'swiper/css';

// ICONS
import { ImLocation2 } from "react-icons/im"
import { AiOutlinePrinter, AiOutlineShareAlt, AiOutlineHeart } from "react-icons/ai"

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
    console.log(listingVirtualTour)
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
                            {listGallery.results.map((node) => {
                                return (
                                    <SwiperSlide>
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
                            {listGallery.results.map((node) => {
                                return (
                                    <SwiperSlide>
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
                            <div className="bg-white p-5">
                                <div className="md:flex items-center">
                                    <div className="md:w-1/2">
                                        {listProp && <span className="accent uppercase font-medium">{listProp.label}</span>}
                                        {listingInfo.address.city && <span className="text-2xl font-bold block text-gray-700">{listingInfo.address.city}, {listingInfo.address.state}</span>}
                                        {listingInfo.address.externalDisplay && <h2 className="flex items-center text-slate-400"><ImLocation2 className="inline accent mr-2" />{listingInfo.address.externalDisplay}</h2>}
                                    </div>
                                    <div className="md:w-1/2 md:text-right">
                                        <div>
                                            <span className={Styles.badge}>{listingInfo.listingStatusDisplay}</span>
                                        </div><br />
                                        {listingInfo.listPrice && <span className="listPrice accent md:text-3xl text-2xl font-medium">{formatPrice.format(listingInfo.listPrice)}</span>}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <ul className={Styles.quickActions}>
                                        <li>
                                            <a href="" className="block"><AiOutlineShareAlt className="inline text-xl" /></a>
                                        </li>
                                        <li>
                                            <a href="" className="block"><AiOutlinePrinter className="inline text-xl" /></a>
                                        </li>
                                        <li>
                                            <a href="" className="block"><AiOutlineHeart className="inline text-xl" /></a>
                                        </li>
                                        <li className="w-full">
                                            <a href="" className={Styles.cta}>Contact</a>
                                        </li>
                                    </ul>
                                </div>
                                {listingInfo.description &&
                                    <div className="border-t mt-8 pt-8">
                                        <h2 className="text-lg font-medium">Description</h2>
                                        <div className="mt-4">
                                        {listingInfo.description}
                                        </div>
                                    </div>}

                            </div>
                            <div className="bg-white my-5 p-5">
                                <h2 className="text-lg font-medium">Details</h2>
                                <div className="mt-4">
                                    <ul className="columns-2 gap-10">
                                        {listingInfo.listingNumber && <li className="border-b py-4"><span className="font-medium">MLS Number:</span> <span>{listingInfo.listingNumber}</span></li>}
                                        {listingInfo.bedrooms && <li className="border-b py-4"><span className="font-medium">Bedrooms:</span> <span>{listingInfo.bedrooms}</span></li>}
                                        {listingInfo.fullBathrooms && <li className="border-b py-4"><span className="font-medium">Bathrooms:</span> <span>{listingInfo.fullBathrooms}{listingInfo.partialBathrooms && `.${listingInfo.partialBathrooms}`}</span></li>}
                                        {listingInfo.squareFeet && <li className="border-b py-4"><span className="font-medium">Square Feet:</span> <span>{listingInfo.squareFeet}</span></li>}
                                        {listProp.label && <li className="border-b py-4"><span className="font-medium">Property Type:</span> <span>{listProp.label}</span></li>}
                                        {listingInfo.status && <li className="border-b py-4"><span className="font-medium">Status:</span> <span className="capitalize">{listingInfo.status}</span></li>}
                                        {listingVirtualTour.virtualTourUrl && <li className="border-b py-4"><span className="font-medium">Virtual Tour:</span> <a href={listingVirtualTour.virtualTourUrl} target="_blank" className="accent font-medium italic" rel="noreferrer"><span className="capitalize">View Tour &#x2192;</span></a></li>}
                                    </ul>
                                </div>
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

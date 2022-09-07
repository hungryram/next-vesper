import urlFor, { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import Sidebar from "../../components/templates/Sidebar"
import Image from "next/image"
import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Pagination, Navigation } from 'swiper'
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import Swiper styles
import 'swiper/css';
import Styles from "../../styles/listing.module.css"
import { formatPrice } from "../../lib/client"

// ICONS
import { ImLocation2 } from "react-icons/im"
import { AiOutlinePrinter, AiOutlineShareAlt, AiOutlineHeart } from "react-icons/ai"
import { PortableText } from "@portabletext/react"
import ListingDetail from "../../components/templates/listingDetail"
import listing from "../../next-vesper/schemas/documents/listing"
import ListingSidebar from "../../components/templates/ListingSidebar"


const queryListings = groq`
*[_type == 'listings' && slug.current == $slug][0]{
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
  tools {
    'fileUrl': fileAttachment[].asset->url
  },
    gallery,
  listingAgent->{
    name,
    position,
    image,
    contactInformation{
    email,
    phoneNumber
  }
  }
  }
`

export async function getStaticPaths() {
    const paths = await sanityRes.fetch(groq`
        *[_type == 'listings' && defined(slug.current)][].slug.current
    `)

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params
    const listings = await sanityRes.fetch(queryListings, { slug })

    return {
        props: {
            listings
        }
    }
}



export default function listingDetail({ listings }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <div className="pt-32 pb-0">
                <div className="container">
                    <h1 className="text-slate-800 md:text-2xl font-medium">{listings.address}</h1>
                    <div className="gallery mt-10">
                        <Swiper
                            modules={[Thumbs, Pagination, Navigation]}
                            thumbs={{ swiper: thumbsSwiper }}
                            navigation={true}
                        >
                            {listings.gallery?.images.map((image) => {
                                return (
                                    <SwiperSlide>
                                        <div className="relative w-full md:h-[50rem] h-96">
                                            <Image
                                                src={urlFor(image).url()}
                                                layout="fill"
                                                objectFit="cover"
                                                placeholder="blur"
                                                blurDataURL={urlFor(image).width(50).height(50).url()}
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
                            {listings.gallery?.images.map((image) => {
                                return (
                                    <SwiperSlide>
                                        <Image
                                            src={urlFor(image).url()}
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
                                    propType={listings.propType}
                                    status={listings.status}
                                    address={listings.address}
                                    city={listings.city}
                                    state={listings.state}
                                    zipCode={listings.zip_code}
                                    description={listings.description}
                                    squareFeet={listings.details.squareFootage}
                                    mlsNumber={listings.details.mlsNumber}
                                    beds={listings.details.bedrooms}
                                    baths={listings.details.bathrooms}
                                    partialBaths=""
                                    yearBuilt={listings.details.yearBuilt}
                                    lotSize={listings.details.lotSize}
                                    hoa={listings.details.hoa}
                                    price={listings.price}
                                />
                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <ListingSidebar
                                name={listings.listingAgent.name}
                                image={listings.listingAgent.image}
                                position={listings.listingAgent.position}
                                email={listings.listingAgent.contactInformation.email}
                                phone={listings.listingAgent.contactInformation.phoneNumber}
                                file={listings.tools.fileUrl}

                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
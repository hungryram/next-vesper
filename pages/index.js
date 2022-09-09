import Link from "next/link";
import Image from "next/image";
import { groq } from "next-sanity"
import urlFor from "../lib/sanity"
import { sanityRes } from "../lib/sanity";
import { Thumbs, Pagination, Navigation } from 'swiper'
import { formatPrice } from "../lib/client";
import { useState } from "react"


// HOME TEMPLATES
import Intro from "../components/home/Intro";
import Banner from "../components/home/Banner";
import ListingCard from "../components/templates/ListingCard";
import Heading from "../components/home/Heading";
import Hero from "../components/home/Hero";
import Cards from "../components/templates/Cards";
import BlogCard from "../components/templates/BlogCard"

// STYLES
import Styles from "../styles/Home.module.css"
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import Swiper styles
import 'swiper/css';
// SLIDER
import { Swiper, SwiperSlide } from 'swiper/react'
import { idxConnection } from "../lib/client";
import Loading from "../components/templates/Loading";
const slugify = require('slugify')


const homeDesign = groq`
{
	'homeDesign': *[_type == 'homeDesign'][0],
  'team': *[_type == 'team'][0..6]{
    name,
    _id,
    image,
    'slug': slug.current
  },
  'blog': *[_type == 'blog'][0..4]{
    'slug': slug.current,
    title,
    _id,
    excerpt,
    date,
    mainImage
  },
  'listings': *[_type == 'listings'][0..6]{
    'slug': slug.current,
    propType,
    _id,
    shortTitle,
    status,
    price,
    address,
    city,
    state,
    zipCode,
    'thumbnail': gallery.images[0],
    'details': details {
   bedrooms,
   bathrooms,
   squareFootage,
 }
  }
}
`

const fetchData = async (endpoint) => {
  const res = await fetch(endpoint, idxConnection)
  const data = await res.json();
  return data.results
}

export async function getStaticProps() {

  const sanityData = await sanityRes.fetch(homeDesign)
  const listingData = await fetch('https://www.idxhome.com/api/v1/client/listings.json?fields=id,listingAgent,listingStatus,listPrice,status,description,squareFeet,bedrooms,fullBathrooms,partialBathrooms,address,latitude,longitude,photos', idxConnection)
  const data = await listingData.json()


  const listings = await Promise.all(data.results.map(async (listing) => {
    const photosEndpoint = listing.photos.links.filter(link => link.rel === 'self').map(e => e.href).toString() + `?fields=largeImageUrl,displayOrder`
    const photoData = await fetchData(photosEndpoint)
    const featuredImage = photoData.filter(photo => photo.displayOrder === 0)[0]
    const photos = photoData.map(url => (url.largeImageUrl))

    const listingObject = {
      slug: slugify(`${listing.address.houseNumber}-${listing.address.streetName}`, { lower: true }),
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
      res: sanityData,
      idx: JSON.parse(JSON.stringify(listings)),
    }
  }
}

export default function Home({ res, idx }) {
  const homeSection = res.homeDesign.pageBuilder
  const defaultText = '#e0e0e0'
  const defaultHeader = '#ffffff'
    return (
    <div className={Styles.homeSections}>
      
      {homeSection.map((section, i) => {

        const headerColor = {
          color: section.textColor?.headerColor?.hex ? section.textColor?.headerColor.hex : defaultHeader
        }
        const bodyColor = {
          color: section.textColor?.textColor?.hex ? section.textColor?.textColor.hex : defaultText
        }

        const backgroundStyles = {
          background: `${section.background?.backgroundType === 'color' && section?.background?.color?.hex || section.background?.backgroundType === 'image' && `url(${section.background.image ? urlFor(section?.background?.image).url() : undefined})`}`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        };

        const blockBackground = {
          background: `${section.blockColors?.backgroundType === 'color' && section?.blockColors?.color?.hex || section.background?.backgroundType === 'image' && `url(${section.background.image ? urlFor(section?.background?.image).url() : undefined})`}`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }

        const blockHeaderColor = {
          color: section.blockText?.headerColor.hex ? section.blockText?.headerColor.hex : defaultHeader
        }
        const blockBodyColor = {
          color: section.blockText?.textColor.hex ? section.blockText?.textColor.hex : defaultText
        }

        const bannerButton = {
          backgroundColor: section.button?.buttonBackground?.hex,
          color: section.button?.buttonTextColor?.hex
        }



        if (section._type === 'hero') {
          return (
            <div key={section._key}>
              <Hero
                heading={section.heading}
                subtitle={section.subtitle}
                image={section.image}
                blurData={section.image}
                headerColor={headerColor}
                bodyColor={bodyColor}
                buttonLink={section.button.buttonLink}
                buttonText={section.button.buttonText}
              />
            </div>
          )
        }


        if (section._type === 'intro') {
          return (
            <div key={section._key} style={backgroundStyles}>
              <Intro
                content={section.content}
                heading={section.heading}
                image={section.image}
                altTag={section.altTag}
                headerStyle={headerColor}
                textColor={bodyColor}
                buttonLink={section.button.buttonLink}
                buttonText={section.button.buttonText}
              />
            </div>
          )
        }

        // FEATURED BLOCKS
        if (section._type === 'featured') {
          return (
            <>
              <div key={section._key} style={backgroundStyles}>
                <div className="section">
                  <div className="container text-center">
                    <Heading
                      heading={section.heading}
                      body={section.text}
                      headerStyle={headerColor}
                      bodyStyle={bodyColor}
                    />
                    <div className={`grid lg:grid-cols-${section.columns} md:grid-cols-2 grid-cols-1 mt-10 gap-3 justify-center`}>
                      {section.blocks.map((node) => {
                        return (
                          <div className="p-6" key={node._key} style={blockBackground}>
                            {node.value && <h3 className="h3 mb-6" style={blockHeaderColor}>{node.value}</h3>}
                            {node.text && <p style={blockBodyColor}>{node.text}</p>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }

        // TEAM SLIDER
        if (section._type === 'teamSlider') {
          return (
            <div className="section" key={section._key} style={backgroundStyles}>
              <div className="container">
                <Heading
                  heading={section.heading}
                  body={section.text}
                  headerStyle={headerColor}
                  bodyStyle={bodyColor}
                />
                <div className="mt-10">
                  <Swiper
                    navigation={true}
                    slidesPerView={4}
                    spaceBetween={30}
                    modules={[Pagination, Navigation]}
                  >
                    {res.team.map((node) => {
                      return (
                        <SwiperSlide key={node._id}>
                          <div>
                            <Cards
                              name={node.name}
                              image={node.image}
                              link={'/team/' + node.slug}
                            />
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          )
        }

        // BANNER
        if (section._type === 'banner') {
          return (
            <div key={section._key} className={Styles.homeBanner} style={backgroundStyles}>
              <Banner
                heading={section.heading}
                text={section.text}
                textStyle={bodyColor}
                headerStyle={headerColor}
                buttonLink={section.button?.buttonLink}
                buttonText={section.button?.buttonText}
                buttonStyle={bannerButton}
              />
            </div>
          )
        }

        // IMAGE BLOCKS
        if (section._type === 'imageBlocks') {
          return (
            <div className="section" key={section._key} style={backgroundStyles}>
              <div className="container">
                <Heading
                  heading={section.heading}
                  body={section.text}
                  headerStyle={headerColor}
                  bodyStyle={bodyColor}
                />
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-10">
                  {section.blocks.map((node) => {
                    return (
                      <Link href={node.link ? node.link : ''} key={node._key}>
                        <a>
                          <div className="relative overflow-hidden" key={node._key}>
                            <Image
                              src={urlFor(node.image).url()}
                              alt={node.value}
                              layout="fixed"
                              height="490"
                              width="450"
                              objectFit="cover"
                              placeholder="blur"
                              blurDataURL={urlFor(node.image).width(50).height(50).quality(1).url()}
                            />
                            <div className="home-image-overlay"></div>
                            <div className="absolute bottom-6 left-0 right-0 text-white px-6 py-4 justify-center text-center">
                              <h3 className="h3 text-white">{node.value}</h3>
                            </div>
                          </div>
                        </a>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        }

        // BLOG SLIDER
        if (section._type === 'blogSlider') {
          return (
            <div className="section" key={i} style={backgroundStyles}>
              <div className="container">
                <Heading
                  heading={section.heading}
                  body={section.text}
                  headerStyle={headerColor}
                  bodyStyle={bodyColor}
                />
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-10">
                  {res.blog.map((node) => {
                    return (
                      <div key={node._id}>
                        <BlogCard
                          title={node.title}
                          image={node?.mainImage}
                          link={'/blog/' + node.slug}
                          excerpt={node?.excerpt}
                          altTag={node?.mainImage?.altTag}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        }

        // ACTIVE LISTINGS
        if (section._type === 'activeListings') {
          return (
            <div className="section" key={section._key} style={backgroundStyles}>
              <div className="container">
                <Heading
                  heading={section.heading}
                  body={section.text}
                  headerStyle={headerColor}
                  bodyStyle={bodyColor}
                />
                <div className="grid grid-cols-3">
                  {res.listings.map((node) => {
                    return (
                      <div key={node._id}>
                        <ListingCard
                          address={node.address}
                          city={node.city}
                          state={node.state}
                          zipCode={node.zipCode}
                          link={'/listings/' + node.slug}
                          image={node.thumbnail}
                          bedrooms={node.details.bedrooms}
                          bathrooms={node.details.bathrooms}
                          squareFootage={node.details.squareFootage}
                          price={node.price}
                          shortTitle={node.shortTitle}
                          propType={node.propType}
                          status={node.status}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        }


        // IDX LISTINGS
        if (section._type === 'idxListings') {
          return (
            <div className="section" key={section._key} style={backgroundStyles}>
              <div className="container">
                <Heading
                  heading={section.heading}
                  body={section.text}
                  headerStyle={headerColor}
                  bodyStyle={bodyColor}
                />
                <div className="mt-10">
                  <Swiper
                    navigation={true}
                    slidesPerView={3}
                    spaceBetween={30}
                    modules={[Pagination, Navigation]}
                  >
                    {idx.map((listing) => {
                      return (
                        <SwiperSlide key={listing._id}>
                          <ListingCard
                            idxAddress={listing.externalDisplay}
                            bedrooms={listing.details.bedrooms}
                            bathrooms={listing.details.fullBathrooms}
                            squareFootage={listing.details.squareFeet}
                            price={formatPrice.format(listing.price)}
                            idxImage={listing.photos.featuredImage}
                            link={`/properties/${listing._id}/${listing.slug}`}
                          />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          )
        }


      })
      }
    </div>
  )
}

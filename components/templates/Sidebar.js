import urlFor, { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import useSWR from 'swr'
import Image from "next/image"
import Link from "next/link"

// SWIPER
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css';

// TEMPLATES
import PlainPage from "./PlainPage"
import ListingCard from "./ListingCard"
import BlogCard from "./BlogCard"
import Cards from "./Cards"
import Form from "./Form"
import Heading from "../home/Heading"
import Social from "./Social"
import Loading from "./Loading"

// IMPORT STYLES
import Styles from "../../styles/sidebar.module.css"

export default function Sidebar() {

    const fetcher = (...args) => sanityRes.fetch(...args)
    const side = groq`
    {
        'appearances': *[_type == 'appearances'][0]{
      'sidebar': sidebar.pageBuilder
    },
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
          publishedAt,
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

    const { data, error } = useSWR(side, fetcher);
    if (error) return "undefined";
    if (!data) return <Loading />;
    const sidebarSections = data.appearances.sidebar

    const defaultText = '#222'
    const defaultHeader = '#7c7c7c'

    return (
        <div className="sidebar">
            {sidebarSections.map((section, i) => {

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

                if (section._type === 'plainPage') {
                    return (
                        <div key={i}>
                            <PlainPage
                                content={section.content}
                            />
                        </div>
                    )
                }

                if (section._type === 'contactPage') {
                    return (
                        <div className="py-6" key={i}>
                            <div className="container">
                                <Heading
                                    heading={section.heading}
                                    body={section.text}
                                />
                                <Form />

                            </div>
                        </div>
                    )
                }

                if (section._type === 'socialComponent') {
                    return (
                        <div className="py-6" key={i}>
                            <div className="container">
                                <Heading
                                    heading={section.heading}
                                    body={section.text}
                                    textAlign="text-left"
                                />
                                <Social />
                            </div>
                        </div>
                    )
                }

                if (section._type === 'imageandText') {
                    return (
                        <div className="py-6" key={i}>
                            <div className="container">
                                <Link href={section?.link ? section?.link : ''}>
                                    <a>
                                        <div className="relative w-full overflow-hidden">
                                            <Image
                                                src={urlFor(section.image).url()}
                                                layout="fixed"
                                                height={400}
                                                width={500}
                                                placeholder="blur"
                                                blurDataURL={urlFor(section.image).width(50).height(50).url()}
                                                objectFit="cover"
                                                alt={section.image.altTag}
                                            />
                                            <div className="overlay"></div>
                                            <div className="absolute w-full bottom-1/2 text-white text-center leading-4">
                                                {section?.heading && <h3 className="h3 text-white">{section.heading}</h3>}
                                                {section?.text && <p>{section.text}</p>}
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )
                }

                // CODE BLOCK
                if (section._type === 'codeBlock') {
                    return (
                        <div className="py-6" key={i}>
                            <div className="container">
                                <div
                                    dangerouslySetInnerHTML={{ __html: `${section?.code}` }}
                                />
                            </div>
                        </div>
                    )
                }

                // TEAM SLIDER
                if (section._type === 'teamSlider') {
                    return (
                        <div className="section" key={section?._key} style={backgroundStyles}>
                            <div className="container">
                                <Heading
                                    heading={section?.heading}
                                    body={section?.text}
                                    headerStyle={headerColor}
                                    bodyStyle={bodyColor}
                                />
                                <div className="mt-10 text-center">
                                    <Swiper
                                        navigation={true}
                                        slidesPerView={1}
                                        modules={[Pagination, Navigation]}
                                        style={{
                                            "--swiper-navigation-size": "25px",
                                        }}
                                    >
                                        {data.team.map((node) => {
                                            return (
                                                <SwiperSlide key={node?._id}>
                                                    <Link href={`/team/${node.slug}`}>
                                                        <a>
                                                            <div className="text-center h-52 w-52 relative m-auto">
                                                                {node?.image ?
                                                                    <Image
                                                                        src={urlFor(node?.image).url()}
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                        width={100}
                                                                        height={100}
                                                                        className="rounded-full"
                                                                        placeholder="blur"
                                                                        blurDataURL={urlFor(node?.image).width(1).height(1).url()}
                                                                    />
                                                                    :
                                                                    <Image
                                                                        src="/user.jpg"
                                                                        layout="fill"
                                                                        objectFit="cover"
                                                                        width={100}
                                                                        height={100}
                                                                        className="rounded-full"
                                                                    />
                                                                }
                                                            </div>
                                                            <h3 className="text-lg text-center pt-5">{node?.name}</h3>
                                                        </a>
                                                    </Link>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    )
                }

                // BLOG SLIDER
                if (section._type === 'blogSlider') {
                    return (
                        <div className="py-6" key={i} style={backgroundStyles}>
                            <div className="container">
                                <Heading
                                    heading={section.heading}
                                    body={section.text}
                                    headerStyle={headerColor}
                                    bodyStyle={bodyColor}
                                    textAlign="text-left"
                                />
                                <div className="mt-10">
                                    {data.blog.map((node) => {
                                        return (
                                            <div className="border-b mt-6 pb-4" key={node._id}>
                                                <Link href={`/blog/${node.slug}`}>
                                                    <a>
                                                        <h3 className="text-xl mb-4">{node.title}</h3>
                                                        <p>{node.publishedAt}</p>
                                                        <span className="accent italic">Read More</span>
                                                    </a>
                                                </Link>
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
                        <div className="py-6" key={section?._key} style={backgroundStyles}>
                            <div className="container">
                                <Heading
                                    heading={section?.heading}
                                    body={section?.text}
                                    headerStyle={headerColor}
                                    bodyStyle={bodyColor}
                                />
                                <div className="mt-10">
                                    <Swiper>
                                        {data?.listings.map((node) => {
                                            return (
                                                <SwiperSlide>
                                                    <div key={node?._id}>
                                                        <ListingCard
                                                            address={node?.address}
                                                            city={node?.city}
                                                            state={node?.state}
                                                            zipCode={node?.zipCode}
                                                            link={'/listings/' + node?.slug}
                                                            image={node?.thumbnail}
                                                            bedrooms={node.details?.bedrooms}
                                                            bathrooms={node.details?.bathrooms}
                                                            squareFootage={node.details?.squareFootage}
                                                            price={node?.price}
                                                            shortTitle={node?.shortTitle}
                                                            propType={node?.propType}
                                                            status={node?.status}
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

            })}
        </div>
    )
}

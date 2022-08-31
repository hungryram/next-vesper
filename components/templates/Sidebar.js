import urlFor, { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import useSWR from 'swr'
import Image from "next/image"
import Link from "next/link"

// TEMPLATES
import PlainPage from "./PlainPage"
import ListingCard from "./ListingCard"
import BlogCard from "./BlogCard"
import Cards from "./Cards"
import Form from "./Form"
import Heading from "../home/Heading"
import Social from "./Social"

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
    if (error) return "An error has occurred.";
    if (!data) return "Loading...";
    const sidebarSections = data.appearances.sidebar
    return (
        <div>
            {sidebarSections.map((section, i) => {
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
                        <div className="py-6"  key={i}>
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
                        <div className="py-6"  key={i}>
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
                        <div className="py-6" key={i} style={backgroundStyles}>
                            <div className="container">
                                <Heading
                                    heading={section.heading}
                                    body={section.text}
                                    headerStyle={headerColor}
                                    bodyStyle={bodyColor}
                                />
                                <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-10">
                                    {res.team.map((node) => {
                                        return (
                                            <div key={node._key}>
                                                <Cards
                                                    name={node.name}
                                                    image={node.image}
                                                    link={'/team/' + node.slug}
                                                />
                                            </div>
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
                        <div className="py-6" key={i} style={backgroundStyles}>
                            <div className="container">
                                <Heading
                                    heading={section.heading}
                                    body={section.text}
                                    headerStyle={headerColor}
                                    bodyStyle={bodyColor}
                                />
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-10">
                                    {res.blog.map((node, i) => {
                                        return (
                                            <div key={node._id}>
                                                <BlogCard
                                                    title={node.title}
                                                    image={node.mainImage}
                                                    link={'/blog/' + node.slug}
                                                    excerpt={node.excerpt}
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
                        <div className="py-6" key={i} style={backgroundStyles}>
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

            })}
        </div>
    )
}

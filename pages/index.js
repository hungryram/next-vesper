import Link from "next/link";
import Image from "next/image";
import { groq } from "next-sanity"
import urlFor from "../lib/sanity"
import { sanityRes } from "../lib/sanity";
import Hero from "../components/home/Hero";
import Cards from "../components/templates/Cards";
import BlogCard from "../components/templates/BlogCard"

// STYLES
import FeaturedStyles from "../styles/featuredblocks.module.css"
import { PortableText } from "@portabletext/react";
import Intro from "../components/home/Intro";
import Banner from "../components/home/Banner";
import ListingCard from "../components/templates/ListingCard";


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

export async function getStaticProps() {
  const res = await sanityRes.fetch(homeDesign)

  return {
    props: {
      res
    }
  }
}

export default function Home({ res }) {
  const homeSection = res.homeDesign.pageBuilder


  return (
    <>
      {homeSection.map((section, i) => {
        if (section._type === 'hero') {
          return (
            <div key={section._key}>
              <Hero
                heading={section.heading}
                image={section.image}
                blurData={section.image}
              />
            </div>
          )
        }

        if (section._type === 'intro') {
          return (
            <div key={section._key}>
              <Intro
                content={section.content}
                heading={section.heading}
                image={section.image}
                altTag={section.altTag}
              />
            </div>
          )
        }

        // FEATURED BLOCKS
        if (section._type === 'featured') {
          return (
            <>
              <div style={{ backgroundImage: `url(${urlFor(section.image).url()})` }} key={i}>
                <div className="section">
                  <div className="container text-center">
                    {section.heading && <h1 className="h2">{section.heading}</h1>}
                    <div className="md:grid-cols-3 grid-cols-1 grid mt-10 gap-1">
                      {section.blocks.map((node) => {
                        return (
                          <div className={`p-16 ${FeaturedStyles.featuredGrid}`} key={node._key}>
                            <h3 className="h3 mb-6">{node.value}</h3>
                            <p>{node.text}</p>
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
            <div className="section" key={i}>
              <div className="container text-center">
                {section.heading && <h1 className="h2">{section.heading}</h1>}
                {section.text &&
                  <PortableText
                    value={section.text}
                  />
                }
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

        // BANNER
        if (section._type === 'banner') {
          return (
            <div key={section._id}>
              <Banner
                heading={section.heading}
                text={section.text}
              />
            </div>
          )
        }

        // IMAGE BLOCKS
        if (section._type === 'imageBlocks') {
          return (
            <div className="section" key={i}>
              <div className="container">
                <div className="text-center md:flex justify-center">
                  <div className="md:w-1/2">
                    {section.heading && <h1 className="h2 mb-8">{section.heading}</h1>}
                    {section.text &&
                      <PortableText
                        value={section.text}
                      />
                    }
                  </div>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-10 justify-center text-center">
                  {section.blocks.map((node) => {
                    return (
                      <div className="relative overflow-hidden" key={node._key}>
                        <Image
                          src={urlFor(node.image).url()}
                          alt={node.value}
                          layout="fixed"
                          height="400"
                          width="400"
                          objectFit="cover"
                        />
                        <div className="overlay"></div>
                        <div className="absolute bottom-6 left-0 right-0 text-white px-6 py-4 justify-center text-center">
                          <h3 className="h3">{node.value}</h3>
                        </div>
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
            <div className="section" key={i}>
              <div className="container">
                <div className="text-center">
                  {section.heading && <h1 className="h2">{section.heading}</h1>}
                  {section.text &&
                    <PortableText
                      value={section.text}
                    />
                  }
                </div>
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
            <div className="section" key={i}>
              <div className="container">
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
      })
      }
    </>
  )
}

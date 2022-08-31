import { sanityRes } from "../lib/sanity"
import { groq } from 'next-sanity'
import urlFor from "../lib/sanity"
import Image from "next/image";
import Link from "next/link";

// TEMPLATES
import Intro from "../components/home/Intro";
import Banner from "../components/home/Banner";
import ListingCard from "../components/templates/ListingCard";
import Heading from "../components/home/Heading";
import Hero from "../components/home/Hero";
import Cards from "../components/templates/Cards";
import BlogCard from "../components/templates/BlogCard"

// STYLES
import Styles from "../styles/Home.module.css"
import PlainPage from "../components/templates/PlainPage";
import Form from "../components/templates/Form";
import Sidebar from "../components/templates/Sidebar";
import Header from "../components/templates/Header";

const pageQuery = groq`
{
    'pageDesign': *[_type == 'pages' && slug.current == $slug][0],
    ...,
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

export async function getStaticPaths() {
    const paths = await sanityRes.fetch(groq`
        *[_type == 'pages' && defined(slug.current)][].slug.current
    `)

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params
    const page = await sanityRes.fetch(pageQuery, { slug })

    return {
        props: {
            page
        }
    }
}

export default function Pages({ page }) {
    const pageSection = page.pageDesign.pageBuilder
    const defaultText = '#e2e2e2'
    const defaultHeader = '#222222'
    console.log(page.pageDesign.headerImage)
    return (
        <>
            <Header
                title={page.pageDesign.title}
                image={page.pageDesign.headerImage}
            />
            <div className="section">
                <div className="container">
                    <div className="md:flex gap-10">
                        <div className={page.pageDesign.pageLayout === 'sidebar' ? 'md:w-2/3' : 'w-full'}>
                            <div className={Styles.homeSections}>
                                {pageSection.map((section, i) => {

                                    const headerColor = {
                                        color: section.textColor?.headerColor.hex ? section.textColor?.headerColor.hex : defaultHeader
                                    }
                                    const bodyColor = {
                                        color: section.textColor?.textColor.hex ? section.textColor?.textColor.hex : defaultText
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
                                            <div className="section" key={i}>
                                                <div className="container">
                                                    <Heading 
                                                        heading={section.heading}
                                                        body={section.text}
                                                        textAlign="text-left"
                                                    />
                                                    <Form />
                                                </div>
                                            </div>
                                        )
                                    }

                                    if (section._type === 'hero') {
                                        return (
                                            <div key={section._key}>
                                                <Hero
                                                    heading={section.heading}
                                                    image={section.image}
                                                    blurData={section.image}
                                                    headerColor={headerColor}
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
                                                    buttonLink={section.button?.buttonLink}
                                                    buttonText={section.button?.buttonText}
                                                />
                                            </div>
                                        )
                                    }

                                    // FEATURED BLOCKS
                                    if (section._type === 'featured') {
                                        return (
                                            <>
                                                <div key={i} style={backgroundStyles}>
                                                    <div className="section">
                                                        <div className="container text-center">
                                                            <Heading
                                                                heading={section.heading}
                                                                body={section.text}
                                                                headerStyle={headerColor}
                                                                bodyStyle={bodyColor}
                                                            />
                                                            <div className={`md:grid-cols-6 grid-cols-1 grid mt-10 gap-3 justify-items-center`}>
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
                                            <div className="section" key={i} style={backgroundStyles}>
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
                                                                <div key={node._id}>
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
                                            <div key={section._id} className={Styles.homeBanner} style={backgroundStyles}>
                                                <Banner
                                                    heading={section.heading}
                                                    text={section.text}
                                                    textStyle={bodyColor}
                                                    headerStyle={headerColor}
                                                    buttonLink={section.button?.buttonLink}
                                                    buttonText={section.button?.buttonText}
                                                />
                                            </div>
                                        )
                                    }

                                    // IMAGE BLOCKS
                                    if (section._type === 'imageBlocks') {
                                        return (
                                            <div className="section" key={i} style={backgroundStyles}>
                                                <div className="container">
                                                    <Heading
                                                        heading={section.heading}
                                                        body={section.text}
                                                        headerStyle={headerColor}
                                                        bodyStyle={bodyColor}
                                                    />
                                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-10 justify-center text-center">
                                                        {section.blocks.map((node) => {
                                                            return (
                                                                <Link href={node.link ? node.link : ''} key={node._id}>
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
                                                                            <div className="overlay"></div>
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
                                            <div className="section" key={i} style={backgroundStyles}>
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
                                })
                                }
                            </div>
                        </div>
                        <div className={page.pageDesign.pageLayout === 'sidebar' ? 'md:w-1/3' : 'hidden'}>
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
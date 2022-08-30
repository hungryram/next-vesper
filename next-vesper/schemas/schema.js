// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import category from './documents/category'
import blog from './documents/blog'
import author from './documents/author'

// DOCUMENTS
import profile from "./documents/profile"
import appearanceSettings from "./documents/appearance"
import legal from "./documents/legal"
import menu from "./documents/navigation"
import pages from "./documents/pages"
import home from "./documents/home"
import team from "./documents/team"
import locations from "./documents/locations"
import partners from "./documents/partners"
import listings from "./documents/listing"

// BLOCKS
import social from "./blocks/social"
import contact from "./blocks/contact"
import location from "./blocks/location"
import seo from "./blocks/seo"
import branding from "./blocks/branding"
import link from "./blocks/link"
import navItem from "./blocks/navItem"
import headerMenu from "./blocks/headerMenu"
import mainColors from "./blocks/mainColors"
import imageColor from "./blocks/image-color"
import imageGallery from "./blocks/imageGallery"
import textColor from "./blocks/textColor"
import customUrl from "./blocks/customUrl"

// HOME BLOCKS
import hero from './homeSections/hero'
import featured from './homeSections/featured'
import teamSlider from './homeSections/teamSlider'
import blogSlider from './homeSections/blogSlider'
import homeIntro from './homeSections/intro'
import banner from './homeSections/banner'
import imageBlocks from './homeSections/image-blocks'
import activeListings from './homeSections/activeListings'

//subblocks
import subMenu from "./subBlocks/subMenu"

// PAGE TEMPLATES
import plainPage from './pageTypes/plain'
import contactPage from './pageTypes/contact'
import html from './pageTypes/html'
import imageandText from './pageTypes/image-text'

// ARRAY
import internalLinks from "./blocks/internalLinks"




// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    profile,
    home,
    appearanceSettings,
    listings,
    pages,
    team,
    locations,
    partners,
    blog,
    author,
    category,
    legal,
    menu,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    social,
    contact,
    location,
    seo,
    branding,
    link,
    navItem,
    headerMenu,
    subMenu,
    mainColors,
    internalLinks,
    imageColor,
    imageGallery,
    customUrl,
    // PAGE TEMPLATES
    plainPage,
    contactPage,
    textColor,
    html,
    imageandText,
    // HOME SECTIONS
    hero,
    featured,
    teamSlider,
    blogSlider,
    homeIntro,
    banner,
    imageBlocks,
    activeListings
  ]),
})

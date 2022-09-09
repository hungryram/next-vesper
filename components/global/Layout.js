import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from 'next/head'
import useSWR from "swr"
import {groq} from "next-sanity"
import urlFor, { sanityRes } from "../../lib/sanity";
import Loading from "../templates/Loading";

export default function Layout({ children }) {

    const fetcher = (url) => sanityRes.fetch(url)

    const appearances = groq`
    {
        'appearances': *[_type == 'appearances'][0]{
        'loader': branding.loadingLogo.asset->url,
        'loaderColor': branding.loadingBackground.hex,
        'loaderImage': branding.loadingLogo.asset->url,
        'navColor': header.navColor.hex,
        'navBgColor': header.headerColor.hex,
        'primaryButtonBg': mainColors.buttonBackgroundColor.hex,
        'primaryButtonText': mainColors.buttonTextColor.hex,
        'footerHeader': footer.headerColor.hex,
        'footerText': footer.textColor.hex,
        'footerBg': footer.footerBackground.color.hex,
        'primaryAccent': mainColors.primaryColor.hex,
        'branding': branding {
                logo,
                logoWidth
            },
            'header': header {
                ctaLink,
                ctaText,
                '': mainNav->{
                'navItems':items[]{
                  'subMenu':subMenu[]{
                  newTab,
                  _key,
                  linkType,
                  externalUrl,
                  text,
                  internalLink->{
                  title,
                  'slug': slug.current,
                  _type
            }
            },
                  linkType,
                  externalUrl,
                  text,
                  _key,
                  newTab,
                  internalLink->{
                  title,
                  'slug': slug.current,
                  _type
                }
                }
              }
              },
       footer {
        ...,
       quickLinks[]{
                   newTab,
                   linkType,
                   externalUrl,
                   text,
                   internalLink->{
                   title,
                   name,
                   'slug': slug.current,
                   _type
       }
     }
     },
      },
      'legal': *[_type == 'legal']{
        title,
        'slug': slug.current,
        _id
      },
        'profileSettings': *[_type == 'profileSettings'][0]{
            company_name,
            contact_information {
                ...
            },
            address {
                ...
            }
        },

      }
    `

    const { data, error } = useSWR(appearances, fetcher)
    if (error) return "undefined";
    if (!data) return <Loading />;
    const bgLoader = data.appearances?.loaderImage
    return (
        <>
            <Head>
                <style>
                    {`
                        :root {

                            --primary-accent: ${data.appearances?.primaryAccent};

                            --footer-background-color: ${data.appearances?.footerBg};
                            --footer-header-color: ${data.appearances?.footerHeader};
                            --footer-text-color: ${data.appearances?.footerText};
                            --primary-button-background: ${data.appearances?.primaryButtonBg};
                            --primary-button-text: ${data.appearances?.primaryButtonText};

                            --header-background-color: ${data.appearances?.navBgColor ? data.appearances?.navBgColor : 'transparent'};
                            --header-navigation-color: ${data.appearances?.navColor};

                            --loading-background-color: ${data.appearances?.loaderColor};
                            --loading-image: url(${bgLoader});
                        
                        }
                    `}
                </style>
            </Head>
            <Navbar 
                logo={data.appearances?.branding?.logo}
                logoWidth={data.appearances.branding?.logoWidth}
                company_name={data.profileSettings?.company_name}
                navItems={data.appearances?.header?.navItems}
                ctaLink={data.appearances.header?.ctaLink}
                ctaText={data.appearances.header?.ctaText}
            />
            <main>
                {children}
            </main>
            <Footer 
                image={data.appearances?.footer?.footerLogo}
                links={data.appearances?.footer?.quickLinks}
                legal={data.legal}
                footerText={data.appearances.footer?.footerText}
                phone_number={data.profileSettings.contact_information?.phone_number}
                office_number={data.profileSettings.contact_information?.office_number}
                email={data.profileSettings.contact_information?.email}
                address={data.profileSettings.address?.address}
                state={data.profileSettings.address?.state}
                city={data.profileSettings.address?.city}
                zipCode={data.profileSettings.address?.zip_code}
                company_name="null"
            />
        </>
    )
}

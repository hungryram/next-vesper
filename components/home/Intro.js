import { PortableText } from "@portabletext/react";
import urlFor from "../../lib/sanity";
import Image from "next/image"
import Link from "next/link"
import PrimaryLink from "../templates/PrimaryLink";

export default function Intro({ image, content, heading, altTag, _key, headerStyle, textStyle, buttonLink, buttonText }) {
    return (
        <div className="section" key={_key}>
            <div className="container">
                <div className="md:flex items-center">
                    {image &&
                        <div className="md:w-1/2 relative text-center mb-10">
                            <Image
                                src={urlFor(image).url()}
                                width={400}
                                height={500}
                                objectFit="contain"
                                alt={altTag}
                                placeholder="blur"
                                blurDataURL={urlFor(image).width(50).height(50).quality(1).url}
                            />
                        </div>
                    }
                    <div className="md:w-1/2">
                        {heading && <h2 className="h2 mb-10" style={headerStyle}>{heading}</h2>}
                        {content &&
                            <div className="content" style={textStyle}>
                                <PortableText
                                    value={content}
                                />
                            </div>
                        }
                        <div className="mt-8">
                            {buttonText &&
                                <PrimaryLink
                                    buttonLink={buttonLink}
                                    buttonText={buttonText}
                                    buttonType="primary-button"
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

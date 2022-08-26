import { PortableText } from "@portabletext/react";
import urlFor from "../../lib/sanity";
import Image from "next/image"

export default function Intro({ image, content, heading, altTag }) {
    return (
        <div className="section">
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
                            />
                        </div>
                    }
                    <div className="md:w-1/2">
                        {heading && <h2 className="h2 mb-10">{heading}</h2>}
                        {content &&
                            <div className="content">
                                <PortableText
                                    value={content}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

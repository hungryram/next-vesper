import { PortableText } from "@portabletext/react"
import Image from "next/image"
import urlFor from "../../lib/sanity"

export default function Hero({ image, heading, subtitle, _key, blurData, bodyColor, headerColor }) {
    return (
        <div className="flex items-center relative h-screen" key={_key}>
            {image ?
                <Image
                    src={urlFor(image).url()}
                    layout="fill"
                    objectFit="cover"
                    alt="Hero Image"
                    priority
                    placeholder="blur"
                    blurDataURL={urlFor(blurData).width(100).height(100).quality(1).url()}
                />
                :
                <Image src="https://res.cloudinary.com/hungryram19/image/upload/v1645813822/Resources/realestate-assets/no-house-photo.jpg"
                    alt=""
                    priority
                />
            }
            <div className="overlay"></div>
            <div className="container absolute top-1/3 bottom-0 left-0 right-0 text-white text-center">
                <h1 className="md:text-5xl text-3xl font-medium" style={headerColor}>{heading}</h1>
                <div style={bodyColor}>
                    <PortableText
                        value={subtitle}
                    />
                </div>
            </div>
        </div>
    )
}

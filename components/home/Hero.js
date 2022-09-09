import Image from "next/image"
import urlFor from "../../lib/sanity"
import PrimaryLink from "../templates/PrimaryLink"

export default function Hero({ image, heading, subtitle, _key, blurData, bodyColor, headerColor, buttonLink, buttonText, idxSubdomain = 'search', idxId = '132970' }) {

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
                <Image
                src="https://res.cloudinary.com/hungryram19/image/upload/v1645813822/Resources/realestate-assets/no-house-photo.jpg"
                layout="fill"
                objectFit="cover"
                alt="Hero Image"
                priority
            />
            }
            <div className="overlay"></div>
            <div className="container absolute top-1/2 left-0 right-0 text-center -mt-20">
                <h1 className="md:text-5xl text-3xl font-medium" style={headerColor}>{heading}</h1>
                {subtitle &&
                    <div className="mt-4 text-lg" style={bodyColor}>
                        <p>{subtitle}</p>
                    </div>
                }
                <div className="mt-16">z
                    <PrimaryLink
                        buttonType="primary-button"
                        buttonLink={buttonLink}
                        buttonText={buttonText}
                    />
                </div>
            </div>
        </div>
    )
}
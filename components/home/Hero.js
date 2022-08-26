import Image from "next/image"
import urlFor from "../../lib/sanity"
import Link from "../../next-vesper/schemas/blocks/link"

export default function Hero({ image, heading, subtitle, key }) {
    return (
        <div className="flex items-center relative h-screen" key={key}>
            {image ?
                <Image
                    src={urlFor(image).url()}
                    layout="fill"
                    objectFit="cover"
                    alt="Hero Image"
                />
                :
                <Image src="https://res.cloudinary.com/hungryram19/image/upload/v1645813822/Resources/realestate-assets/no-house-photo.jpg" alt="" />
            }
            <div className="overlay"></div>
            <div className="container absolute top-1/3 bottom-0 left-0 right-0 text-white text-center">
                <h1 className="md:text-5xl text-3xl font-medium">{heading}</h1>
                <p className="m-10">{subtitle}</p>
                <div className="mt-10">

                </div>
            </div>
        </div>
    )
}

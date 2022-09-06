import Link from "next/link"
import Image from "next/image"
import urlFor from "../../lib/sanity"
import { MdLocationPin } from "react-icons/md"
import { BiBed } from "react-icons/bi"
import { BiBath } from "react-icons/bi"
import { MdSquareFoot } from "react-icons/md"

export default function ListingCard({ link, image, idxImage, address, idxAddress, city, state, zipCode, bedrooms, price, bathrooms, squareFootage, propType, shortTitle, status }) {
    return (
        <Link href={link ? link : '/'}>
            <a>
                <div className="flex flex-col">
                    <div className="relative w-full h-96">
                        {
                            (image &&
                                <Image
                                    src={urlFor(image).url()}
                                    layout="fill"
                                    objectFit="cover"
                                    alt={address}
                                    placeholder="blur"
                                    blurDataURL={urlFor(image).width(50).height(50).quality(1).url()}
                                />)
                            ||
                            (idxImage &&
                                <Image
                                    src={idxImage}
                                    layout="fill"
                                    objectFit="cover"
                                    alt={address ? address : idxAddress}
                                    placeholder="blur"
                                    blurDataURL={idxImage}
                                />
                            )
                            ||
                            <Image
                                src="https://res.cloudinary.com/hungryram19/image/upload/v1645813822/Resources/realestate-assets/no-house-photo.jpg"
                                layout="fill"
                                objectFit="cover"
                                alt={address ? address : idxAddress}
                            />
                        }
                        <div className="absolute bottom-0 text-white p-6">
                            <div className="flex">
                                <div className="w-1/2">
                                    {propType && <span className="uppercase">{propType}</span>}
                                </div>
                            </div>
                        </div>
                        {status &&
                            <div className="absolute top-0 p-6">
                                <div className="bg-black px-4 py-1">
                                    <span className="text-sm text-white block capitalize">{status}</span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="px-6 py-4 text-left bg-white border-b h-40">
                        {price && <span className="accent font-bold text-xl">{price}</span>}
                        {shortTitle && <span className="text-xl block text-black my-3">{shortTitle}</span>}
                        {address && <div className="flex items-center mb-3"><MdLocationPin className="accent" /><h3 className="text-sm font-light">{address}, {city} {state} {zipCode}</h3></div>}
                        {idxAddress && <div className="flex items-center mb-3"><MdLocationPin className="accent" /><h3 className="text-sm font-light">{idxAddress}</h3></div>}
                        <div className="grid grid-cols-6 gap-0">
                            {bedrooms && <div className="flex items-center"><BiBed className="mr-1" /><span className="font-light">{bedrooms}</span></div>}
                            {bathrooms && <div className="flex items-center"><BiBath className="mr-1" /><span className="font-light">{bathrooms}</span></div>}
                            {squareFootage && <div className="flex items-center"><MdSquareFoot className="mr-1" /><span className="font-light">{squareFootage}</span></div>}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

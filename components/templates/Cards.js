import Image from 'next/image'
import urlFor from '../../lib/sanity'
import Link from "next/link"

export default function Cards({ name, image, link }) {
    return (
        <Link href={link}>
            <a>
                <div>
                    <div className="relative w-full h-80">
                        {image ?
                            <Image
                                src={urlFor(image).url()}
                                layout="fill"
                                objectFit="cover"
                            />
                            :
                            <img src="https://res.cloudinary.com/hungryram19/image/upload/v1645813822/Resources/realestate-assets/no-house-photo.jpg" alt="photo coming soon" />
                        }
                    </div>
                    <div className="px-2 py-4 text-left">
                        {name && <div className="text-xl mb-2 font-medium">{name}</div>}
                    </div>
                </div>
            </a>
        </Link>

    )
}

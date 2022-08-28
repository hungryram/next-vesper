import Image from 'next/image'
import urlFor from '../../lib/sanity'
import Link from "next/link"

export default function Cards({ name, image, link, _key }) {
    return (
        <Link href={link} key={_key}>
            <a>
                <div>
                    <div className="relative w-full h-80">
                        {image ?
                            <Image
                                src={urlFor(image).url()}
                                layout="fill"
                                objectFit="cover"
                                alt={name}
                                placeholder="blur"
                                blurDataURL={urlFor(image).width(50).height(50).quality(1).url()}
                            />
                            :
                            <Image src="https://res.cloudinary.com/hungryram19/image/upload/v1645813822/Resources/realestate-assets/no-house-photo.jpg" alt="photo coming soon" />
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

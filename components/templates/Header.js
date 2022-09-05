import urlFor from "../../lib/sanity";
import Image from "next/image"

export default function Header({ image, title, altTag }) {
    return (
        <div className={`flex items-center relative lg:h-[20em] h-[10rem]${image ? `` : ` bg-black`}`}>
            {image &&
                <Image
                    src={urlFor(image).url()}
                    layout="fill"
                    objectFit="cover"
                    alt={altTag}
                    placeholder="blur"
                    blurDataURL={urlFor(image).width(50).height(50).url()}
                    priority
                />
            }
            <div className="overlay"></div>
            <div className="container absolute md:top-2/3 top-1/2 bottom-0 left-0 right-0 text-white text-center">
                {title && <h1 className="md:text-5xl text-3xl font-medium text-white">{title}</h1>}
            </div>
        </div>
    )
}

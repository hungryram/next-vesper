import urlFor from "../../lib/sanity"
import Link from "next/link"
import Image from "next/image"

export default function BlogCard({ image, title, date, excerpt, link, altTag }) {
    return (
        <div>
            <Link href={link}>
                <a>
                    <div className="md:flex gap-10 items-center border hover:shadow-md transition-all ease-linear">
                        <div className="md:w-2/5 relative h-64 w-full">
                            <Image
                                src={urlFor(image).url()}
                                layout="fill"
                                objectFit="cover"
                                alt={altTag}
                                placeholder="blur"
                                blurDataURL={urlFor(image).width(50).height(50).quality(1).url()}
                            />
                        </div>
                        <div className="md:3/5">
                            <h2 className="h3">{title}</h2>
                            {date && <span>{date}</span>}
                            {excerpt && <p className="mt-6">{excerpt}</p>}
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

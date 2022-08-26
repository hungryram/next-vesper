import urlFor from "../../lib/sanity"
import Link from "next/link"
import Image from "next/image"

export default function BlogCard({ image, title, date, excerpt, link, altTag, _key }) {
    return (
        <Link href={link} key={_key}>
            <a>
                <div className="md:flex gap-10 items-center border hover:shadow-md transition-all ease-linear">
                    <div className="md:w-2/5 relative h-64 w-full">
                        <Image
                            src={urlFor(image).url()}
                            layout="fill"
                            objectFit="cover"
                            alt={altTag}
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
    )
}

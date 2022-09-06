import Image from "next/image";
import urlFor from "../../lib/sanity";
import Form from "./Form";

export default function ListingSidebar({ image, name, position, phone, email }) {
    return (
        <div className="bg-white p-4">
            <div className="relative text-center">
                <div className="md:flex items-center">
                    <div className="md:w-1/2">
                        {image &&
                            <Image
                                src={urlFor(image).url()}
                                width={100}
                                height={100}
                                objectFit="cover"
                                className="rounded-full"
                                placeholder="blur"
                                blurDataURL={urlFor(image).width(1).height(1).url()}
                            />
                        }
                    </div>
                    <div className="md:w-1/2 text-left">
                        <h2 className="text-xl font-medium">{name}</h2>
                        <ul>
                            {position && <li> <span className="text-gray-600 font-medium">{position}</span></li>}
                            {phone && <li> <span><a href={`tel:${phone}`}>{phone}</a></span></li>}
                            {email && <li> <span><a href={`mailto:${email}`}>{email}</a></span></li>}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-4 p-4">
                <Form />
            </div>
        </div>
    )
}

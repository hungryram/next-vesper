import Image from "next/image";
import urlFor from "../../lib/sanity";
import Form from "./Form";
import { AiOutlineDownload } from "react-icons/ai"

export default function ListingSidebar({ image, name, position, phone, email, file, mlsName }) {
    return (
        <>
            <div className="bg-white p-4">
                {mlsName &&
                    <div className="px-4">
                        <h2>Listing Agent</h2>
                    </div>
                }
                <div className="relative text-center">
                    <div className="md:flex items-center">
                        {image &&
                            <div className="md:w-1/2">

                                <Image
                                    src={urlFor(image).url()}
                                    width={100}
                                    height={100}
                                    objectFit="cover"
                                    className="rounded-full"
                                    placeholder="blur"
                                    blurDataURL={urlFor(image).width(1).height(1).url()}
                                />

                            </div>
                        }
                        <div className="md:w-1/2 text-left p-4">
                            {name && <h2 className="text-xl font-medium">{name}</h2>}
                            {mlsName && <h2 className="text-xl font-medium">{mlsName}</h2>}
                            <ul>
                                {position && <li> <span className="text-gray-600 font-medium">{position}</span></li>}
                                {phone && <li> <span><a href={`tel:${phone}`}>{phone}</a></span></li>}
                                {email && <li> <span><a href={`mailto:${email}`}>{email}</a></span></li>}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="px-4">
                    <Form />
                </div>
            </div>
            <div className="p-4 my-4 bg-white">
                <h2>Additional Details</h2>
                <div>
                    <ul>
                        {file.map((node) => {
                            return (
                                <li>
                                    <a href={node} target="_blank" rel="noreferrer" className="flex items-center accent">File Attachment <AiOutlineDownload className="ml-2 text-xl" /></a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

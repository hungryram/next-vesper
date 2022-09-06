import React from 'react'
import Styles from "../../styles/listing.module.css"
import { formatPrice } from '../../lib/client'
// ICONS
import { ImLocation2 } from "react-icons/im"
import { AiOutlinePrinter, AiOutlineShareAlt, AiOutlineHeart } from "react-icons/ai"
import { PortableText } from "@portabletext/react"
import ListingSidebar from './ListingSidebar'


export default function ListingDetail({ propType, address, city, state, zipCode, status, price, description, mlsNumber, beds, baths, squareFeet, partialBaths, garage, shortTitle, hoa, lotSize, yearBuilt, name }) {
    return (
        <>
            <div className="bg-white p-5">
                <div className="md:flex items-center">
                    <div className="md:w-1/2">
                        {propType && <span className="accent uppercase font-medium">{propType}</span>}
                        {city && <span className="text-2xl font-bold block text-gray-700">{city}, {state}</span>}
                        {address || city || state || zipCode && <h2 className="flex items-center text-slate-400"><ImLocation2 className="inline accent mr-2" />{address} {city} {state} {zipCode}</h2>}
                    </div>
                    <div className="md:w-1/2 md:text-right">
                        <div>
                            {status && <span className={Styles.badge}>{status}</span>}
                        </div><br />
                        {price && <span className="listPrice accent md:text-3xl text-2xl font-medium">{formatPrice.format(price)}</span>}
                    </div>
                </div>
                <div className="mt-6">
                    <ul className={Styles.quickActions}>
                        <li>
                            <a href="" className="block"><AiOutlineShareAlt className="inline text-xl" /></a>
                        </li>
                        <li>
                            <a href="" className="block"><AiOutlinePrinter className="inline text-xl" /></a>
                        </li>
                        <li>
                            <a href="" className="block"><AiOutlineHeart className="inline text-xl" /></a>
                        </li>
                        <li className="w-full">
                            <a href="" className={Styles.cta}>Contact</a>
                        </li>
                    </ul>
                </div>
                {description &&
                    <div className="border-t mt-8 pt-8">
                        <h2 className="text-lg font-medium">Description</h2>
                        <div className="mt-4">
                            <PortableText
                                value={description}
                            />
                        </div>
                    </div>}

            </div>
            <div className="bg-white my-5 p-5">
                <h2 className="text-lg font-medium">Details</h2>
                <div className="mt-4">
                    <ul className="columns-2 gap-10">
                        {mlsNumber && <li className="border-b py-4"><span className="font-medium">MLS Number:</span> <span>{mlsNumber}</span></li>}
                        {beds && <li className="border-b py-4"><span className="font-medium">Bedrooms:</span> <span>{beds}</span></li>}
                        {baths && <li className="border-b py-4"><span className="font-medium">Bathrooms:</span> <span>{`${baths}${partialBaths && partialBaths}`}</span></li>}
                        {squareFeet && <li className="border-b py-4"><span className="font-medium">Square Feet:</span> <span>{squareFeet}</span></li>}
                        {propType && <li className="border-b py-4"><span className="font-medium">Property Type:</span> <span>{propType}</span></li>}
                        {status && <li className="border-b py-4"><span className="font-medium">Status:</span> <span className="capitalize">{status}</span></li>}
                        {garage && <li className="border-b py-4"><span className="font-medium">Status:</span> <span className="capitalize">{garage}</span></li>}
                        {hoa && <li className="border-b py-4"><span className="font-medium">HOA:</span> <span className="capitalize">{hoa}</span></li>}
                        {lotSize && <li className="border-b py-4"><span className="font-medium">Lot Size:</span> <span className="capitalize">{lotSize}</span></li>}
                        {yearBuilt && <li className="border-b py-4"><span className="font-medium">Year Built:</span> <span className="capitalize">{yearBuilt}</span></li>}
                    </ul>
                </div>
            </div>
        </>
    )
}

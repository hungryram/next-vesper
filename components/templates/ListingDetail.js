import Styles from "../../styles/listing.module.css"
import { formatPrice } from '../../lib/client'
// ICONS
import { ImLocation2 } from "react-icons/im"
import { AiOutlinePrinter, AiOutlineShareAlt, AiOutlineHeart } from "react-icons/ai"
import { PortableText } from "@portabletext/react"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Form from "./Form"


export default function ListingDetail({ propType, address, city, state, zipCode, status, price, description, mlsNumber, beds, baths, squareFeet, partialBaths, garage, shortTitle, hoa, lotSize, yearBuilt, name, mlsDescription, mlsBaths }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="bg-white p-5">
                <div className="md:flex items-center">
                    <div className="md:w-1/2">
                        {propType && <p className="accent uppercase font-medium">{propType}</p>}
                        {city && <p className="text-2xl font-bold block text-gray-700">{city}, {state}</p>}
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
                        <li>
                            <button
                                type="button"
                                onClick={openModal}
                                className={Styles.cta}
                            >
                                Contact
                            </button>
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
                    </div>
                }
                {mlsDescription &&
                    <div className="border-t mt-8 pt-8">
                        <h2 className="text-lg font-medium">Description</h2>
                        <div className="mt-4">
                            {mlsDescription}
                        </div>
                    </div>
                }

            </div>
            <div className="bg-white my-5 p-5">
                <h2 className="text-lg font-medium">Details</h2>
                <div className="mt-4">
                    <ul className="md:columns-2 gap-10">
                        {mlsNumber && <li className="border-b py-4"><span className="font-medium">MLS Number:</span> <span>{mlsNumber}</span></li>}
                        {beds && <li className="border-b py-4"><span className="font-medium">Bedrooms:</span> <span>{beds}</span></li>}
                        {baths && <li className="border-b py-4"><span className="font-medium">Bathrooms:</span> <span>{baths}</span></li>}
                        {mlsBaths && <li className="border-b py-4"><span className="font-medium">Bathrooms:</span> <span>{`${mlsBaths}.${partialBaths}`}</span></li>}
                        {squareFeet && <li className="border-b py-4"><span className="font-medium">Square Feet:</span> <span>{squareFeet}</span></li>}
                        {propType && <li className="border-b py-4"><span className="font-medium">Property Type:</span> <span className="capitalize">{propType}</span></li>}
                        {status && <li className="border-b py-4"><span className="font-medium">Status:</span> <span className="capitalize">{status}</span></li>}
                        {garage && <li className="border-b py-4"><span className="font-medium">Status:</span> <span className="capitalize">{garage}</span></li>}
                        {hoa && <li className="border-b py-4"><span className="font-medium">HOA:</span> <span className="capitalize">{hoa}</span></li>}
                        {lotSize && <li className="border-b py-4"><span className="font-medium">Lot Size:</span> <span className="capitalize">{lotSize}</span></li>}
                        {yearBuilt && <li className="border-b py-4"><span className="font-medium">Year Built:</span> <span className="capitalize">{yearBuilt}</span></li>}
                    </ul>
                </div>
            </div>



            <Transition show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 w-1/2" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Get in touch
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Please use the form to request more information</p>
                                    </div>
                                    <div className="my-4">
                                        <Form />

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

import Styles from "../../styles/listing.module.css"
import { formatPrice } from '../../lib/client'
// ICONS
import { ImLocation2 } from "react-icons/im"
import { AiOutlinePrinter, AiOutlineShareAlt, AiOutlineHeart, AiFillInstagram, AiFillRedditCircle, AiFillTwitterCircle, AiFillYoutube, AiFillFacebook, AiFillLinkedin } from "react-icons/ai"
import { PortableText } from "@portabletext/react"

import { Dialog, Transition, Popover } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Form from "./Form"
import { useRouter } from 'next/router'


export default function ListingDetail({ propType, address, city, state, zipCode, status, price, description, mlsNumber, beds, baths, squareFeet, partialBaths, garage, shortTitle, hoa, lotSize, yearBuilt, name, mlsDescription, mlsBaths, virtualTour, domain }) {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const { asPath } = useRouter();
    return (
        <>
            <div className="bg-white p-5">
                <div className="md:flex items-center">
                    <div className="md:w-1/2 mb-6">
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
                        <li className="border">
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Popover.Button className="rounded-md px-3 py-2">
                                            <AiOutlineShareAlt className="text-xl"/>
                                        </Popover.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel className="absolute left-20 z-10 mt-3 w-52 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                    <div className="bg-gray-50 p-4">
                                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${domain}${asPath}`} target="_blank" rel="noreferrer" className="block">Facebook</a>
                                                        <a href={`https://twitter.com/intent/tweet?url=${domain}${asPath}`} target="_blank" rel="noreferrer" className="block">Twitter</a>
                                                        <a href={`https://www.linkedin.com/shareArticle?url=${domain}${asPath}`} target="_blank" rel="noreferrer" className="block">Linkedin</a>
                                                        <a href={`https://pinterest.com/pin/create/button/?url${domain}${asPath}`} target="_blank" rel="noreferrer" className="block">Linkedin</a>
                                                        <a href={`mailto:?subject=${address}`} rel="noreferrer" className="block">Share via Email</a>
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
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
                        {virtualTour && <li className="border-b py-4"><span className="font-medium">Virtual Tour:</span> <span className="capitalize italic">View Virtual Tour</span></li>}
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

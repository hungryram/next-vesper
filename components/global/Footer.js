import { sanityRes } from "../../lib/sanity"
import { groq } from 'next-sanity'
import useSWR from 'swr'




export default function Footer() {

    const profile = groq`
    *[_type == 'profileSettings'][0]
    `

    const { data, error } = useSWR(profile, query => sanityRes.fetch(query));

      if (error) return "An error has occurred.";
      if (!data) return "Loading...";

    return (
        <footer className="text-center lg:text-left bg-gray-100 text-gray-600">
            <div className="section">
                <div className="container">
                <div className="mx-6 py-10 text-left">
                <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h6 className="
                            uppercase
                            font-semibold
                            mb-4
                            flex
                            items-center
                            justify-center
                            md:justify-start">
                            {data.company_name}
                        </h6>
                    </div>
                    <div>
                        <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
                            Products
                        </h6>
                        <p className="mb-4">
                            <a href="#!" className="text-gray-600">Angular</a>
                        </p>
                        <p className="mb-4">
                            <a href="#!" className="text-gray-600">React</a>
                        </p>
                        <p className="mb-4">
                            <a href="#!" className="text-gray-600">Vue</a>
                        </p>
                        <p>
                            <a href="#!" className="text-gray-600">Laravel</a>
                        </p>
                    </div>
                    <div>
                        <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
                            Useful links
                        </h6>
                        <p className="mb-4">
                            <a href="#!" className="text-gray-600">Pricing</a>
                        </p>
                        <p className="mb-4">
                            <a href="#!" className="text-gray-600">Settings</a>
                        </p>
                        <p className="mb-4">
                            <a href="#!" className="text-gray-600">Orders</a>
                        </p>
                        <p>
                            <a href="#!" className="text-gray-600">Help</a>
                        </p>
                    </div>
                    <div>
                        <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">Contact</h6>
                        <ul>
                            {data.contact_information.phone_number && <li><a href={`tel:${data.contact_information.phone_number}`}>{data.contact_information.phone_number}</a></li>}
                            {data.contact_information.email && <li><a href={`tel:${data.contact_information.phone_number}`}>{data.contact_information.email}</a></li>}
                            {data.address.address && <li><a href="">{data.address.address}</a></li>}
                        </ul>
                    </div>
                </div>
            </div>
                </div>
            </div>
            <div className="text-center p-6 bg-gray-200">
            <p className="text-sm font-light pt-0">&copy; Copyright {new Date().getFullYear()} &middot; {data.company_name} &middot; Website built by <a href="https://www.hungryram.com/" className="font-bold" target="_blank">Hungry Ram</a></p>
            </div>
        </footer>
    )
}

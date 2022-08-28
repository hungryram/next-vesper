import Link from "next/link"

export default function Banner({ link, heading, text, key }) {
    return (
        <div className="section">
            <div className="container">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        {heading && <h2 className="h3 mb-2">{heading}</h2>}
                        {text && <p>{text}</p>}
                    </div>
                    <div className="md:w-1/2">
                        {link &&
                            <Link href="/contact">
                                <a>

                                </a>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

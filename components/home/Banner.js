export default function Banner({ link, heading, text }) {
    return (
        <div className="section bg-black text-white">
            <div className="container">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        {heading && <h2 className="h3 mb-2">{heading}</h2>}
                        {text && <p>{text}</p>}
                    </div>
                    <div className="md:w-1/2">
                        {link &&
                            <Link href="">
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

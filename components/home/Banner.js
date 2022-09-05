import Link from "next/link"

export default function Banner({ link, heading, text, headerStyle, textStyle, buttonLink, buttonText, buttonStyle }) {
    return (
        <div className="section">
            <div className="container">
                <div className={`md:flex items-center${buttonText ? '' : ' justify-center text-center'}`}>
                    <div className="md:w-1/2">
                        {heading && <h2 className="h3 mb-4" style={headerStyle}>{heading}</h2>}
                        {text && <p style={textStyle}>{text}</p>}
                    </div>
                    {buttonText &&
                        <div className="md:w-1/2 text-center sm:m-0 mt-16">
                            <div>
                                <Link href={buttonLink}>
                                <a style={buttonStyle} className="primary-button">
                                    {buttonText}
                                </a>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

import Link from "next/link"
import PrimaryLink from "../templates/PrimaryLink"

export default function Banner({ link, heading, text, headerStyle, textStyle, buttonLink, buttonText }) {
    return (
        <div className="section">
            <div className="container">
                <div className={`md:flex items-center${buttonText ? '' : ' justify-center text-center'}`}>
                    <div className="md:w-1/2">
                        {heading && <h2 className="h3 mb-2" style={headerStyle}>{heading}</h2>}
                        {text && <p style={textStyle}>{text}</p>}
                    </div>
                    {buttonText &&
                        <div className="md:w-1/2 text-center sm:m-0 mt-16">
                            <div>
                                <PrimaryLink
                                    buttonLink={buttonLink}
                                    buttonText={buttonText}
                                    buttonType="primary-button"
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

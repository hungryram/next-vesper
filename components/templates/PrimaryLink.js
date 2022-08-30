import Link from "next/link"
 
export default function PrimaryLink({buttonLink, buttonText, buttonType}) {
    return (
        <Link href={buttonLink? buttonLink : '/'}>
            <a className={buttonType}>
                {buttonText}
            </a>
        </Link>
    )
}

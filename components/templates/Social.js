import useSWR from "swr"
import { groq } from "next-sanity"
import { sanityRes } from "../../lib/sanity"
import { AiFillInstagram, AiFillRedditCircle, AiFillTwitterCircle, AiFillYoutube, AiFillFacebook, AiFillLinkedin } from "react-icons/ai"
import { FaYelp, FaTiktok } from "react-icons/fa"
import { BsPinterest } from "react-icons/bs"
import { SiZillow } from "react-icons/si"

// STYLES
import Styles from "../../styles/social.module.css"

export default function Social() {

    const social = groq`
    {
    'profileSettings': *[_type == 'profileSettings'][0]{
    social
    }
  }
  `

    const { data, error } = useSWR(social, query => sanityRes.fetch(query))
    if (error) return "An error has occurred.";
    if (!data) return "Loading...";

    const socialProfile = data.profileSettings.social
    const size = 'text-2xl'

    return (
        <div className="py-4">
            <ul className={Styles.socialParent}>
                {socialProfile?.facebook && <li><a href={socialProfile?.facebook} target="_blank" rel="noreferrer"><AiFillFacebook className={size}/></a></li>}
                {socialProfile?.youtube && <li><a href={socialProfile?.youtube} target="_blank" rel="noreferrer"><AiFillYoutube className={size}/></a></li>}
                {socialProfile?.instagram && <li><a href={socialProfile?.instagram} target="_blank" rel="noreferrer"><AiFillInstagram className={size}/></a></li>}
                {socialProfile?.twitter && <li><a href={socialProfile?.twitter} target="_blank" rel="noreferrer"><AiFillTwitterCircle className={size}/></a></li>}
                {socialProfile?.reddit && <li><a href={socialProfile?.reddit} target="_blank" rel="noreferrer"><AiFillRedditCircle className={size}/></a></li>}
                {socialProfile?.linkedin && <li><a href={socialProfile?.linkedin} target="_blank" rel="noreferrer"><AiFillLinkedin className={size}/></a></li>}
                {socialProfile?.yelp && <li><a href={socialProfile?.yelp} target="_blank" rel="noreferrer"><FaYelp className={size}/></a></li>}
                {socialProfile?.pinterest && <li><a href={socialProfile?.pinterest} target="_blank" rel="noreferrer"><BsPinterest className={size}/></a></li>}
                {socialProfile?.tiktok && <li><a href={socialProfile?.tiktok} target="_blank" rel="noreferrer"><FaTiktok className={size}/></a></li>}
                {socialProfile?.zillow && <li><a href={socialProfile?.zillow} target="_blank" rel="noreferrer"><SiZillow className={size}/></a></li>}
            </ul>
        </div>
    )
}

import '../styles/globals.css'
import Layout from '../components/global/Layout'
import Navbar from '../components/global/Navbar'
import Footer from '../components/global/Footer'
import { sanityRes } from '../lib/sanity'
import { groq } from 'next-sanity'

function MyApp({ Component, pageProps, res }) {
  console.log(res)
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}


export default MyApp

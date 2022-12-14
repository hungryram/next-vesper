import '../styles/globals.css'
import Layout from '../components/global/Layout'
import Navbar from '../components/global/Navbar'
import Footer from '../components/global/Footer'
import Seo from '../components/global/Seo'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Seo />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}


export default MyApp

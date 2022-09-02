const slugify = require('slugify')


import Link from "next/link"
export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()

    return {
        props: {
            posts: data.slice(0,7)
        }
    }
}


export default function index({ posts }) {
  return (
    <div>
        {posts.map((node) => {
            return (
                <Link href={`posts/` + slugify(node.title, {lower: true})}>
                <a>
                    <h1>{node.title}</h1>
                </a>
                </Link>
            )
        })}
    </div>
  )
}

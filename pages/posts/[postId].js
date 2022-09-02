const slugify = require('slugify')
export async function getStaticPaths() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const data = await response.json()


    const paths = data.map(post => {
        return {
            params: {
                postId: `${post.id}`
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}




export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    const data = await response.json()

    return {
        props: {
            post: data
        }
    }
}

export default function PostDetail({ post }) {
  return (
    <div>
        <h1 className="text-4xl">{post.title}</h1>
        <div>{post.body}</div>
    </div>
  )
}

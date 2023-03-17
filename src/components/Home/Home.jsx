import React, { useEffect, useState } from 'react'
import axios from "axios"
import Post from '../Post/Post'
import PostForm from '../Post/PostForm'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState()
    const [error, setError] = useState()

    const refreshPost = () => {
        axios.get("http://localhost:8080/api/v1/posts")
            .then(response => {
                setPosts(response)
                setIsLoaded(true)
            })
            .catch(err => {
                setIsLoaded(true)
                setError(err)
            })
    }

    useEffect(() => {
        refreshPost()
    }, [posts])
    return (
        <div className='px-40 py-20 flex flex-col gap-y-10 justify-center items-center w-full'>
            {error && (
                <div> {error}</div>
            )}
            {!isLoaded && (
                <div> Loading...</div>
            )}
            <PostForm post={posts.data} refreshPost={refreshPost} />
            {!error && isLoaded && posts.data.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>

    )
}

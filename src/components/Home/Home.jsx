import React, { useEffect, useState } from 'react'
import axios from "axios"
import Post from '../Post/Post'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/posts")
            .then(response => {
                setPosts(response)
                setIsLoaded(true)
            })
            .catch(err => {
                setIsLoaded(true)
                setError(err)
            })
    }, [])
    return (
        <div className='px-40 py-10'>
            {error && (
                <div> {error}</div>
            )}
            {!isLoaded && (
                <div> Loading...</div>
            )}
            {!error && isLoaded && posts.data.map(post => (
                <Post key={post.id} title={post.title} text={post.text} />
            ))}
        </div>

    )
}

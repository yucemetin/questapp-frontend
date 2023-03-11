import React, { useEffect, useState } from 'react'
import axios from "axios"

export default function Post() {

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
            {!error && isLoaded && (
                <ul className='flex flex-col gap-4'>
                    {posts.data.map(post => (
                        <li key={post.id} className="flex flex-col p-6 bg-red-200 rounded-3xl gap-y-4">
                            <div className='text-red-400 font-extrabold text-2xl px-2'>{post.title}</div>
                            <div className='rounded-2xl bg-red-300 p-4 flex justify-between text-red-600'>
                                <div className='text-md font-bold text-white'>{post.text}</div>
                                <div>1</div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

import React from 'react'
import axios from 'axios'
import { Post } from './components'
import { useEffect, useState } from 'react'

const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3030/posts").then((response) => {
            setPosts(response.data)
        })
    }, [posts])

    return (
        <div>
            {posts.map((value, key) => (
                <div key={key}>
                    <Post value={value} key={key} />
                </div>
            ))}
        </div>
    )
}

export default Home
import React from 'react'
import axios from 'axios'
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
                <div className="post_container" key={key}>
                    <div className="post_header">{value.title}</div>
                    <div className="post_body">{value.postText}</div>
                    <div className="post_footer">{value.username}</div>
                </div>
            ))}
        </div>
    )
}

export default Home
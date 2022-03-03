import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {
    const [posts, setPosts] = useState([])
    const history = useHistory()

    useEffect(() => {
        axios.get("http://localhost:3030/posts").then((response) => {
            setPosts(response.data)
        })
    }, [])

    return (
        <div>
            {posts.map((value, key) => (
                <div className="post_container" key={key} onClick={() => history.push(`post/${value.id}`)}>
                    <div className="post_header">{value.title}</div>
                    <div className="post_body">{value.postText}</div>
                    <div className="post_footer">{value.username}</div>
                </div>
            ))}
        </div>
    )
}

export default Home
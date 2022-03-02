import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Post = () => {

    const [post, setPost] = useState({})

    let { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3030/posts/byId/${id}`).then((response) => {
            setPost(response.data)
        })
    }, [post])

    return (
        <div className="postBody">
            <div className="post_container innerPost">
                <div className="post_header">{post.title}</div>
                <div className="post_body">{post.postText}</div>
                <div className="post_footer">{post.username}</div>
            </div>
            <div className="commentSection">
                Comment Section
            </div>
        </div>
    )
}

export default Post
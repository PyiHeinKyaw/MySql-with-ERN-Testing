import React, { useEffect, useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Comment } from './components'
import { AuthContext } from '../../helpers/AuthContext'

const Post = () => {

    const [post, setPost] = useState({})
    let { id } = useParams()
    let { authState } = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:3030/posts/byId/${id}`).then((response) => {
            setPost(response.data)
        })
    }, [])

    const handleDelete = () => {
        axios.delete(`http://localhost:3030/posts/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            alert(response.data)
            history.push('/')
        })
    }

    return (
        <>
            <div className="post_container">
                <div className="post_header">{post.title}</div>
                <div className="post_body">{post.postText}</div>
                <div className="post_footer indi_post_footer">
                    {post.username}
                    {authState.username === post.username && (
                        <button onClick={handleDelete}>Delete</button>
                    )}
                </div>
            </div>
            <Comment postId={id} />
        </>
    )
}

export default Post
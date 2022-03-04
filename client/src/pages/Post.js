import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Post = () => {

    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    let { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3030/posts/byId/${id}`).then((response) => {
            setPost(response.data)
        })

        axios.get(`http://localhost:3030/comments/${id}`).then((response) => {
            setComments(response.data)
        })
    }, [comments])

    const addComment = () => {
        axios.post(`http://localhost:3030/comments/`, {
            commentBody: newComment,
            PostId: id
        }, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then((response) => {
            setNewComment("")
        })
    }

    return (
        <>
            <div className="post_container">
                <div className="post_header">{post.title}</div>
                <div className="post_body">{post.postText}</div>
                <div className="post_footer">{post.username}</div>
            </div>
            <div className='comment_section'>
                <input type="text" name="comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button onClick={addComment}>Comment</button>
            </div>

            {comments.map((comment, key) => (
                <div className="comment_list_container" key={key}>
                    {comment.commentBody}
                </div>
            ))}
        </>
    )
}

export default Post
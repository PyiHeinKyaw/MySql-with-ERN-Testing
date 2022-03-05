import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../../helpers/AuthContext'
import axios from 'axios'

const Comment = props => {

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    const { authState } = useContext(AuthContext)

    const id = props.postId


    useEffect(() => {
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
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            setNewComment("")
            if (response.data.error) {
                console.log(response.data.error)
            }
        })
    }

    const deleteComment = e => {
        const commentId = e.target.id

        axios.delete(`http://localhost:3030/comments/${commentId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error) {
                console.log(response.data.error)
            }
            else {
                alert('Comment has been deleted')
            }
        })
    }


    return (
        <>
            {!authState.status ? (
                <h3>Log In First to Comment Out</h3>
            ) : (
                <div className='comment_section'>
                    <input type="text" name="comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <button onClick={addComment}>Comment</button>
                </div>
            )
            }

            {
                comments.map((comment, key) => (
                    <div className="comment_list_container" key={key}>
                        <div className='left'>
                            <h4>{comment.username}</h4>
                            {comment.commentBody}
                        </div>
                        <div className='right'>
                            {authState.username === comment.username && (
                                <button id={comment.id} onClick={deleteComment}>x</button>
                            )}
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Comment
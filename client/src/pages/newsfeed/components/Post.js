import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import axios from 'axios'
import { AuthContext } from '../../../helpers/AuthContext'

const Post = props => {

    const { authState } = useContext(AuthContext)
    const userId = authState.id

    const { id, title, postText, Likes } = props.value
    let heart = props.heartButton
    const history = useHistory()
    const [likeStatus, setLikeStatus] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3030/likes/byPost/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            setLikeStatus(response.data.likeStatus)
        })
    }, [id])


    const handleLike = id => {
        axios.post("http://localhost:3030/likes", {
            PostId: id
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            // console.log(response.data)
        })
    }

    const isLiked = (data) => {
        const filter = data.filter(like => like.UserId === userId)
        if (filter.length === 1) {
            return (
                <>
                    <AiFillHeart className='icon' />
                </>
            )
        } else {
            return (
                <>

                    <AiOutlineHeart className='icon' />
                </>
            )
        }
    }

    return (
        <div className="post_container">
            <div onClick={() => history.push(`post/${id}`)} className="clickable">
                <div className="post_header">{title}</div>
                <div className="post_body">{postText}</div>
            </div>
            <div className="post_footer">

                <p>{Likes.length}</p>

                <button onClick={() => handleLike(id)} className="icon_click">
                    {isLiked(Likes)}
                    {/* {!likeStatus ? <AiOutlineHeart className='icon' /> : <AiFillHeart className='icon' />} */}

                </button>
            </div>
        </div>
    )
}

export default Post
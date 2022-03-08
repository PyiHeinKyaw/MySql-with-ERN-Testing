import React, { useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AiOutlineHeart, AiFillHeart, AiOutlineComment, AiOutlineSmallDash } from 'react-icons/ai'
import axios from 'axios'
import { AuthContext } from '../../../helpers/AuthContext'
import { TimeDiff } from '../../../helpers/TimeDiff'


const Post = props => {

    const { authState } = useContext(AuthContext)
    const userId = authState.id

    const { id, postText, username, createdAt, Likes, Comments, UserId } = props.value
    const history = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:3030/likes/byPost/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            // setLikeStatus(response.data.likeStatus)
        })
    }, [id])


    const handleLike = id => {
        axios.post("http://localhost:3030/likes", {
            PostId: id
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
    }
    var dt = '2016-05-02T00:00:00';

    const isLiked = (data) => {
        const filter = data.filter(like => like.UserId === userId)
        if (filter.length === 1) {
            return <AiFillHeart className='icon' />
        } else {
            return <AiOutlineHeart className='icon' />
        }
    }

    return (
        <div className="post_container newsfeed_post">
            <div className="post_header">
                <div className='left_side'>
                    <div className='avatar'></div>
                    <div className='name_group'>
                        <Link to={`profile/${UserId}`} className='name'>{username}</Link>
                        <div className='created_time'>
                            <TimeDiff time={createdAt} />
                        </div>
                    </div>
                </div>
                <div className='right_side'>
                    <AiOutlineSmallDash className='icon' />
                </div>
            </div>

            <div onClick={() => history.push(`post/${id}`)} className="post_body">{postText}</div>
            <div className="post_footer">

                <div className='footer_group'>
                    <p>{Likes.length}</p>
                    <button onClick={() => handleLike(id)} className="icon_click">
                        {isLiked(Likes)}
                    </button>
                </div>

                <div className='footer_group'>
                    <p>{Comments.length}</p>
                    <button className="icon_click" onClick={() => history.push(`post/${id}`)}>
                        <AiOutlineComment className='icon' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { VscSettingsGear } from 'react-icons/vsc'
import { RiUserFollowLine } from 'react-icons/ri'
import { AuthContext } from '../../../helpers/AuthContext'
import axios from 'axios'
import { CurrentTime } from '../../../helpers/TimeDiff'

const Hero = props => {
    const { id } = props
    const profileId = useParams().id

    const { authState } = useContext(AuthContext)

    const [postCount, setPostCount] = useState(0)
    const [followerCount, setFollowerCount] = useState(0)
    const [profileUser, setProfileUser] = useState([])
    const [isMine, setIsMine] = useState(false)
    const [follow, setFollow] = useState(false)

    const { username } = profileUser

    const profileCheck = () => { profileId == authState.id ? setIsMine(true) : setIsMine(false) }

    const followCheck = () => {
        axios.get(`http://localhost:3030/followers/checkFollow/${profileId}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            response.data ? setFollow(true) : setFollow(false)
        })
    }

    useEffect(() => {

        profileCheck()

        followCheck()

        axios.get(`http://localhost:3030/auth/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            setProfileUser(response.data)
        })

        axios.get(`http://localhost:3030/posts/byUser/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            setPostCount(response.data.length)
        })

        axios.get(`http://localhost:3030/followers/byUser/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            setFollowerCount(response.data.length)
        })

    }, [id]);

    const EditBtn = () => (
        <button className="edit_profile">
            <VscSettingsGear className='icon' />
            <span>Edit Profile</span>
        </button>
    )

    const FollowBtn = () => (
        <button className="follow_btn" onClick={handleFollowClick}>Follow</button>
    )

    const FollowDoneBtn = () => (
        <button className="follow_done" onClick={handleFollowClick}>
            <RiUserFollowLine />
        </button>
    )

    const isFollow = () => {
        return follow ? <FollowDoneBtn /> : <FollowBtn />
    }

    const handleFollowClick = e => {
        axios.post('http://localhost:3030/followers', { UserId: profileId, updatedAt: <CurrentTime /> }, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            response.data.status ? setFollow(true) : setFollow(false)
        })
    }

    return (
        <section className='hero_section'>
            <div className='avatar'></div>
            <div className='info'>
                <div className='username infoRow'>
                    {username}
                    {isMine ? <EditBtn /> : isFollow()}
                </div>
                <div className='social_row infoRow'>
                    <div className='social_group'>
                        <b>{postCount}</b> Posts
                    </div>
                    <div className='social_group'>
                        <b>{followerCount}</b> Followers
                    </div>
                    <div className='social_group'>
                        <b>0</b> Comments
                    </div>
                </div>
                <div className='bio infoRow'>BIO</div>
                {/* <div className="follow_row">
                    <FollowBtn />
                </div> */}
            </div>
        </section>
    )
}

export default Hero
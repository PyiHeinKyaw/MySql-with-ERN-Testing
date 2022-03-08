import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../helpers/AuthContext'
import axios from 'axios'

const Hero = props => {
    const { id } = props

    let { authState } = useContext(AuthContext)
    const [postCount, setPostCount] = useState(0)
    const [profileUser, setProfileUser] = useState([])

    const { username } = profileUser

    useEffect(() => {

        axios.get(`http://localhost:3030/auth/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            setProfileUser(response.data)
        })

        axios.get('http://localhost:3030/posts/byUser', {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            console.log(response.data)
            // setPostCount(response.data.length)
        })
    }, []);

    return (
        <section className='hero_section'>
            <div className='avatar'></div>
            <div className='info'>
                <div className='username infoRow'>{username}</div>
                <div className='social_row infoRow'>
                    <div className='social_group'>
                        <b>{postCount}</b> Posts
                    </div>
                    <div className='social_group'>
                        <b>0</b> Followers
                    </div>
                    <div className='social_group'>
                        <b>0</b> Comments
                    </div>
                </div>
                <div className='bio infoRow'>BIO</div>
            </div>
        </section>
    )
}

export default Hero
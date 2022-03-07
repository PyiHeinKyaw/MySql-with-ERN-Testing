import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../helpers/AuthContext'
import axios from 'axios'

const Hero = () => {

    let { authState } = useContext(AuthContext)
    const [postCount, setPostCount] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:3030/posts/byUser', {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            setPostCount(response.data.length)
        })
    }, []);


    return (
        <section className='hero_section'>
            <div className='avatar'></div>
            <div className='info'>
                <div className='username infoRow'>{authState.username}</div>
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
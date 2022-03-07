import React, { useContext } from 'react'
import axios from 'axios'
import { Post } from './components'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { AuthContext } from '../../helpers/AuthContext'

const Home = () => {
    const [posts, setPosts] = useState([])

    const { authState } = useContext(AuthContext)


    useEffect(() => {
        axios.get("http://localhost:3030/posts").then((response) => {
            setPosts(response.data)
        })
    }, [posts])

    return (
        <div>
            {posts.map((value, key) => (
                <div key={key}>
                    <Post value={value} key={key} heartButton={<AiOutlineHeart className='icon' />} />
                </div>
            ))}
        </div>
    )
}

export default Home
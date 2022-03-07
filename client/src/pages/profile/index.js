import React from 'react'
import { useParams } from 'react-router-dom'
import { Hero } from './components'
import './Profile.css'

const Profile = () => {
    let { id } = useParams()

    return (
        <>
            <Hero />
        </>
    )
}

export default Profile
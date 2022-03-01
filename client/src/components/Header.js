import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className='link'>
                Home
            </Link>
            <Link to="/createpost" className='link'>
                New Post
            </Link>
        </div >
    )
}

export default Header
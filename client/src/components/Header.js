import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="header">
            <div className='left_menu'>
                <Link to="/" className='link'>
                    Home
                </Link>
                <Link to="/createpost" className='link'>
                    New Post
                </Link>
            </div>
            <div className='right_menu'>
                <Link to="/login" className='link'>
                    Login
                </Link>
                <Link to="/register" className='link'>
                    Register
                </Link>
            </div>
        </div >
    )
}

export default Header
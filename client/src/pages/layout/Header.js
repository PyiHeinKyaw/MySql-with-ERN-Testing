import React, { useContext } from 'react'
import { AuthContext } from '../../helpers/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const Header = () => {

    const { authState, setAuthState } = useContext(AuthContext)
    const history = useHistory()

    const handleClick = e => {
        localStorage.removeItem("accessToken")
        setAuthState({ username: "", id: 0, status: false })
        history.push('/login')
    }

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
            {authState.status === false ? (
                <>
                    <div className='right_menu'>
                        <Link to="/login" className='link'>
                            Login
                        </Link>
                        <Link to="/register" className='link'>
                            Register
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <button className='logout_btn' onClick={handleClick}>Logout</button>
                </>
            )}
        </div >
    )
}

export default Header
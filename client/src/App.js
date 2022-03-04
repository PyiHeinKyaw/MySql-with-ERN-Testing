import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthContext } from './helpers/AuthContext'
import axios from 'axios'

const App = () => {

    const [authState, setAuthState] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3030/auth/checkauth', {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
            .then((response) => {
                if (response.data.error) {
                    setAuthState(false)
                }
                else {
                    setAuthState(true)
                }
            })
    }, [])
    return (
        <div className="">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Home}></Route>
                        <Route path="/createpost" exact component={CreatePost}></Route>
                        <Route path="/post/:id" exact component={Post}></Route>
                        {!authState && (
                            <>
                                <Route path="/login" exact component={Login}></Route>
                                <Route path="/register" exact component={Register}></Route>
                            </>
                        )}
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    )

}

export default App
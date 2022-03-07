import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header, CreatePost, Login, Register, Home, Post, Profile } from './pages'
import { AuthContext } from './helpers/AuthContext'
import axios from 'axios'

const App = () => {

    const [authState, setAuthState] = useState({ username: "", id: 0, status: false });

    useEffect(() => {
        axios.get('http://localhost:3030/auth/checkauth', {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error) {
                setAuthState({ username: "", id: 0, status: false })
            }
            else {
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true,
                })
            }
        })
    }, [])

    return (
        <div className="">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <Header />
                    <Switch>

                        {!authState.status ? (
                            <>
                                <Route path="/login" exact component={Login}></Route>
                                <Route path="/register" exact component={Register}></Route>
                            </>
                        ) : (
                            <>
                                <Route path="/" exact component={Home}></Route>
                                <Route path="/createpost" exact component={CreatePost}></Route>
                                <Route path="/post/:id" exact component={Post}></Route>
                                <Route path="/profile/:id" exact component={Profile}></Route>
                            </>
                        )}

                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    )

}

export default App
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'

const App = () => {

    return (
        <div className="">
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/createpost" exact component={CreatePost}></Route>
                    <Route path="/post/:id" exact component={Post}></Route>
                </Switch>
            </Router>
        </div>
    )

}

export default App
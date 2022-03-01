import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import CreatePost from './pages/CreatePost'

const App = () => {

    return (
        <div className="">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" exact element={<Home />}></Route>
                    <Route path="/createpost" exact element={<CreatePost />} ></Route>
                </Routes>
            </Router>
        </div>
    )

}

export default App
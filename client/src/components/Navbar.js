import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if (state) {
            return [
                <li key = "profile"><a href = "/profile">Profile</a></li>,
                <li key = "create-post"><a href = "/create">Create Post</a></li>,
                <li key = "my-following-post"><a href = "/myfollowingpost">My Following Posts</a></li>,
                <li key = "logout"><button className ="btn #c62828 red darken-3" type="submit" name="action"
                onClick = {()=> {
                    localStorage.clear()
                    dispatch({type: "CLEAR"})
                    history.push('/login')
                    window.location.reload()
                }}>
                LOG OUT
            </button></li>
            ]
        } else {
            return [
                <li key = "login"><a href = "/login">Login</a></li>,
                <li key = "sign-up"><a href = "/signup">Sign Up</a></li>
            ]
        }
    }
    return (
        <nav>
            <div id = "navbar" className = "nav-wrapper">
                <a href = "/" className = "brand-logo left">Instagram</a>
                <ul id = "nav-mobile" className = "right hide-on-med-and-down">
                {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;
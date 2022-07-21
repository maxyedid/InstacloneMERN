import React, {useContext} from 'react'
import {UserContext} from '../App'

const NavBar = () => {
    const {state, dispatch} = useContext(UserContext)
    const renderList = () => {
        if (state) {
            return [
                <li key = "profile"><a href = "/profile">Profile</a></li>,
                <li key = "create-post"><a href = "/create">Create Post</a></li>
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
            <div className = "nav-wrapper">
                <a href = "/" className = "brand-logo left">Instagram</a>
                <ul id = "nav-mobile" className = "right hide-on-med-and-down">
                {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;
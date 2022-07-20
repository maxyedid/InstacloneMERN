import React from 'react'

const NavBar = () => {
    return (
        <nav>
            <div className = "nav-wrapper">
                <a href = "/" className = "brand-logo left">Instagram</a>
                <ul id = "nav-mobile" className = "right hide-on-med-and-down">
                    <li><a href = "/login">Login</a></li>
                    <li><a href = "/signup">Sign Up</a></li>
                    <li><a href = "/profile">Profile</a></li>
                    <li><a href = "/create">Create Post</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;
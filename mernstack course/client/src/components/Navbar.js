import React from 'react'

const NavBar = () => {
    return (
        <nav>
            <div className = "nav-wrapper">
                <a href = "/" className = "brand-logo left">Home</a>
                <ul id = "nav-mobile" className = "right hide-on-med-and-down">
                    <li><a href = "/login">Login</a></li>
                    <li><a href = "/signin">Sign Up</a></li>
                    <li><a href = "/profile">Profile</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;
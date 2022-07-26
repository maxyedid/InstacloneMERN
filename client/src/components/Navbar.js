import React, {useContext, useRef, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const NavBar = () => {
    const searchModal = useRef(null)
    const [search, setSearch] = useState("")
    const [userDetails, setUserDetails] = useState([])
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    useEffect(() => {
        M.Modal.init(searchModal.current)
    }, [])
    const renderList = () => {
        if (state) {
            return [
                <li key = "search"><i data-target = "modal1" className="large material-icons modal-trigger" style = {{color: "black"}}>search</i></li>,
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
    const fetchUsers = (query) => {
        setSearch(query)
        fetch('/search-users', {
            method: "post",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        }).then(res => res.json()).then(result => {
            setUserDetails(result.user)
        })
    }
    return (
        <nav>
            <div id = "navbar" className = "nav-wrapper">
                <a href = "/" className = "brand-logo left">Instagram</a>
                <ul id = "nav-mobile" className = "right hide-on-med-and-down">
                {renderList()}
                </ul>
            </div>
            <div id= "modal1" className="modal" ref = {searchModal}>
                <div  style = {{color:"black"}} className="modal-content">
                <input type = "text" placeholder = "Search users"
                 value = {search} onChange = {(e) => fetchUsers(e.target.value)} />
                 <ul className="collection">
                    {userDetails.length === 0? <h5 className = "collection-item">No results found</h5>:
                    userDetails.map(item => {
                        return <a href = {item._id !== state._id ? "/profile/" + item._id: "/profile"} onClick = {() => {
                            setSearch('')
                        }}><li className = "collection-item">{item.email}</li></a>
                    })}
                </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat">Agree</button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
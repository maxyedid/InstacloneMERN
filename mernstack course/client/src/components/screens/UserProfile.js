import React, {useEffect, useState, useContext} from "react";
import {useParams} from 'react-router-dom'
import { UserContext } from "../../App";

const UserProfile = () => {
    const [userProfile, setProfile] = useState([])
    const [showFollow, setShowFollow] = useState(true)
    const {userid} = useParams();
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=> {
        fetch(`http://localhost:4000/user/${userid}`, {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {
            if (state._id) {
            if (result.user.followers.includes(state._id)) {
                setShowFollow(false)
            }
        }
            setProfile(result)
        })
    },[state, userid])

    const followUser = () => {
        fetch("http://localhost:4000/follow", {
            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                followId: userid
            })
        }).then(res => res.json()).then(data => {
            dispatch({type: "UPDATE", payload: {following: data.following, followers: data.following}})
            localStorage.setItem("user", JSON.stringify(data))
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user:{...prevState.user,
                    followers:[...prevState.user.followers, data._id]}
                }
            })
            setShowFollow(false)
        })
    }

    const unfollowUser = () => {
        fetch("http://localhost:4000/unfollow", {
            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json()).then(data => {
            dispatch({type: "UPDATE", payload: {following: data.following, followers: data.following}})
            localStorage.setItem("user", JSON.stringify(data))
            setProfile((prevState) => {
                const newFollowers = prevState.user.followers.filter(item => item !== data._id)
                return {
                    ...prevState,
                    user:{...prevState.user,
                    followers: newFollowers}
                }
            })
            setShowFollow(true)
        })
    }
    return (
        <>
        {
        userProfile.user ?
        <div style = {{maxWidth: "1068px", margin:"0px auto"}}>
            <div style = {{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                <img style = {{width: "160px", height: "160px", borderRadius: "80px"}}
                src = "https://media-exp2.licdn.com/dms/image/D4D03AQEzEKjDCSbRlQ/profile-displayphoto-shrink_800_800/0/1643615041664?e=1663804800&v=beta&t=hLZek1BO6-Lv3X73-d204iwvpL1p7l7UbpW5ySQtbcY"
                alt = ""
                 /> </div>
            <div>
                <h4>{userProfile.user.name}</h4>
                <h5>{userProfile.user.email}</h5>
                    <div style = {{display: "flex", justifyContent: "space-between", width: "108%"}}>
                        <h6>{userProfile.posts.length} {userProfile.posts.length === 1? "Post":"Posts"} </h6>
                        <h6>{userProfile.user.followers.length} {userProfile.user.followers.length === 1? "Follower": "Followers"}</h6>
                        <h6>{userProfile.user.following.length} {userProfile.user.following.length === 1? "Following": "Following"}</h6>
                    </div>
                    {showFollow ?<button style = {{margin: "10px"}} className ="btn waves-effect waves-light #64b5f6 blue darken-1" type="submit" name="action" onClick = {()=>followUser()}>
                    Follow
                </button>: <button style = {{margin: "10px"}} className = "btn #c62828 red darken-3" type="submit" name="action" onClick = {()=>unfollowUser()}>
                    Unfollow
                </button>}
                </div>
            </div>

            <div className = "gallery">
                {
                    userProfile.posts.map(item => {
                        return (
                            <img key = {item._id} className = "item" src = {item.photo} alt = {item.title}/>
                        )
                    })
                }
            </div>
        </div>
       : <h2>loading...!</h2> }
        </>
    )
}

export default UserProfile;
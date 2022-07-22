import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'

const UserProfile = () => {
    const [userProfile, setProfile] = useState([])
    const {userid} = useParams();
    useEffect(()=> {
        fetch(`http://localhost:4000/user/${userid}`, {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {
            setProfile(result)
        })
    },[userid])
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
                        <h6>40 Followers</h6>
                        <h6>40 Following</h6>
                    </div>
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
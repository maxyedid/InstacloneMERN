import React, {useEffect, useState, useContext} from "react";
import {UserContext} from '../../App'

const Profile = () => {
    const [mypics, setPics] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=> {
        fetch("http://localhost:4000/mypost", {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {
            setPics(result.myData)
        })
    },[])
    return (
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
                <h4>{state? state.name: "loading"}</h4>
                    <div style = {{display: "flex", justifyContent: "space-between", width: "108%"}}>
                        <h6>40 Posts</h6>
                        <h6>40 Followers</h6>
                        <h6>40 Following</h6>
                    </div>
                </div>
            </div>

            <div className = "gallery">
                {
                    mypics.map(item => {
                        return (
                            <img key = {item._id} className = "item" src = {item.photo} alt = {item.title}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile;
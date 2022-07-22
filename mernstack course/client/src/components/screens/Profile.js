import React, {useEffect, useState} from "react";

const Profile = () => {
    const [myProfile, setProfile] = useState([])
    useEffect(()=> {
        fetch("http://localhost:4000/user/myprofile", {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {
            console.log(result)
            setProfile(result)
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
                <h4>{myProfile.user? myProfile.user.name: "loading"}</h4>
                    <div style = {{display: "flex", justifyContent: "space-between", width: "108%"}}>
                        <h6>{myProfile.posts? myProfile.posts.length: "Loading"} Posts</h6>
                        <h6>40 Followers</h6>
                        <h6>40 Following</h6>
                    </div>
                </div>
            </div>

            <div className = "gallery">
                
                {myProfile.posts? 
                    myProfile.posts.map(item => {
                        return (
                            <img key = {item._id} className = "item" src = {item.photo} alt = {item.title}/>
                        )
                    }): "Loading"
                }
            </div>
        </div>
    )
}

export default Profile;
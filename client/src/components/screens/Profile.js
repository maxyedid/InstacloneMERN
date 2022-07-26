
import React, {useEffect, useState, useContext} from "react";
import { UserContext } from "../../App";

const Profile = () => {
    const [myProfile, setProfile] = useState([])
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const {state,dispatch} = useContext(UserContext)

    useEffect(()=> {
        fetch("/user/myprofile", {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {
            setProfile(result)
        })
    },[])
    useEffect(() => {
        if (image) {
        const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/mernstackcourse/image/upload"
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name","mernstackcourse")
        fetch(CLOUDINARY_URL, {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => {
            console.log(data)
            setUrl(data.url)
            localStorage.setItem("user", JSON.stringify({...state, pic:data.url}))
            dispatch({type: "UPDATEPIC", payload:data.url})
        }).catch(err => {
            console.log(err)
        })
        }
    }, [image])
    
    const updatePhoto = (file) =>{
        setImage(file)
    }
    return (
        <>
        {myProfile.user ? 
        <div style = {{maxWidth: "1068px", margin:"0px auto"}}>
            <div style = {{
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
            <div style = {{
                display: "flex",
                justifyContent: "space-around"
            }}>
                <div>
                <img style = {{width: "160px", height: "160px", borderRadius: "80px"}}
                src = {state? state.pic: "loading"}
                alt = ""
                 /> 
                 </div>
            <div>
                <h4>{myProfile.user.name}</h4>
                <h5>{myProfile.user.email}</h5>
                    <div style = {{display: "flex", justifyContent: "space-between", width: "108%"}}>
                        <h6>{myProfile.posts? myProfile.posts.length: "Loading"} Posts</h6>
                        <h6>{myProfile.user.followers.length} {myProfile.user.followers.length === 1? "Follower": "Followers"}</h6>
                        <h6>{myProfile.user.following.length} {myProfile.user.following.length === 1? "Following": "Following"}</h6>
                    </div>
                </div>
            
            
            
            </div>
            <div className ="file-field input-field" style = {{margin: "10px 0px 0px 185px"}}>
                <div className ="btn #64b5f6 blue darken-1">
                    <span>Update Pic</span>
                    <input type="file" onChange = {(e) => updatePhoto(e.target.files[0])}/>
                     </div>
                    <div className ="file-path-wrapper">
                <input className ="file-path validate" type="text"/>
                 </div>
            </div>
                </div>

            <div className = "gallery">
                    {myProfile.posts.map(item => {
                        return (
                            <img key = {item._id} className = "item" src = {item.photo} alt = {item.title}/>
                        )
                    })
                }
            </div>
        </div>
        : state? <h2>Loading</h2> : <h5>Please login to your account</h5>}
        </>
    )
}

export default Profile;
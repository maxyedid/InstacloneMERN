import React,{useState, useEffect} from "react";
import {useHistory} from "react-router-dom"
import M from "materialize-css"

const Signup = () => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)

    
    useEffect(() => {
        if (url) {
            uploadFields()
        }
    }, [url])
    const uploadPic = () =>{
        const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/mernstackcourse/image/upload"
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name","mernstackcourse")
        fetch(CLOUDINARY_URL, {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => {
            setUrl(data.url)
        }).catch(err => {
            console.log(err)
        })
    }
    const uploadFields = () => {
        fetch("http://localhost:4000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                pic: url
            })
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.error) {
                const errorMessage = document.getElementById("invalid")
                errorMessage.innerText = data.error;
                errorMessage.hidden = false;
                M.toast({html: data.error, classes: "#c62828 red darken-3"})
            } else {
                M.toast({html: data.message, classes: "#43a047 green darken-1"})
                history.push("/login")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const PostData = () => {
        if (image) {
            uploadPic()
        } else {
            uploadFields()
        }
    }
    return (
        <div className = "mycard">
            <div id = "signupcard" className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type = "text" placeholder = "Name" value = {name}
                onChange = {(e) => setName(e.target.value)}/>
                <input type = "text" placeholder = "Email" value = {email}
                onChange = {(e) => setEmail(e.target.value)}/>
                <input type = "password" placeholder = "Password" value = {password}
                onChange = {(e) => setPassword(e.target.value)}/>
                <div className ="file-field input-field">
                <div className ="btn #64b5f6 blue darken-1">
                    <span>Upload Pfp</span>
                    <input type="file" onChange = {(e) => setImage(e.target.files[0])}/>
                     </div>
                    <div className ="file-path-wrapper">
                <input className ="file-path validate" type="text"/>
                 </div>
            </div>
                <button className ="btn waves-effect waves-light #64b5f6 blue darken-1" type="submit" name="action"
                onClick = {()=>PostData()}>
                    Sign Up
                </button>
                <h5>
                    <a href = "./login">Already have an account?</a>
                </h5>
                <h6 id = "invalid" style = {{color: "red"}} hidden = {true}>Invalid arguments, please fill out all fields</h6>
            </div>
        </div>
    )
}


export default Signup;
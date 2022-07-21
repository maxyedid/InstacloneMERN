import React,{useState} from "react";
import {useHistory} from "react-router-dom"
import M from "materialize-css"

const Signup = () => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = () => {
        fetch("http://localhost:4000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
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
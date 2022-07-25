import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../App'
import M from "materialize-css"

const Login = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const PostData = () => {
        fetch("http://localhost:4000/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            if (data.error) {
                const errorMessage = document.getElementById("invalid")
                errorMessage.innerText = data.error;
                errorMessage.hidden = false;
                M.toast({html: data.error, classes: "#c62828 red darken-3"})
            } else {
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                history.push('/')
                M.toast({html: "Login successful", classes:"#43a047 green darken-1"})
                window.location.reload()
                dispatch({type: "USER", payload: data.user})
                
            }
        })
    }
    return (
        <div className = "mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type = "text" placeholder = "Email" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                <input type = "password" placeholder = "Password" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                <button className ="btn waves-effect waves-light #64b5f6 blue darken-1" type="submit" name="action" onClick = {()=>PostData()}>
                    Login
                </button>
                <h5>
                    <a href = "./signup">Don't have an account?</a>
                </h5>
                <h6 id = "invalid" style = {{color: "red"}} hidden = {true}>Invalid arguments, please fill out all fields</h6>
            </div>
        </div>
    )
}

export default Login;
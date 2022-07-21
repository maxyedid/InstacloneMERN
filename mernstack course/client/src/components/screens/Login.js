import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css"

const Login = () => {

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
                M.toast({html: data.error, classes: "#c62828 red darken-3"})
            } else {
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                M.toast({html: "Login successful", classes:"#43a047 green darken-1"})
                history.push('/')
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
            </div>
        </div>
    )
}

export default Login;
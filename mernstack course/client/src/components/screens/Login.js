import React from "react";

const Login = () => {
    return (
        <div className = "mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type = "text" placeholder = "Email" />
                <input type = "text" placeholder = "Password" />
                <button className ="btn waves-effect waves-light #64b5f6 blue darken-1" type="submit" name="action">
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
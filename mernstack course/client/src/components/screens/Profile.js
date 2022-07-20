import React from "react";

const Profile = () => {
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
                <h4>Max Yedid</h4>
                    <div style = {{display: "flex", justifyContent: "space-between", width: "108%"}}>
                        <h6>40 Posts</h6>
                        <h6>40 Followers</h6>
                        <h6>40 Following</h6>
                    </div>
                </div>
            </div>

            <div className = "gallery">
                <img className = "item" src = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg" alt = ""/>
                <img className = "item" src = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg" alt = ""/>
                <img className = "item" src = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg" alt = ""/>
                <img className = "item" src = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg" alt = ""/>
                <img className = "item" src = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg" alt = ""/>
                <img className = "item" src = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg" alt = ""/>
            </div>
        </div>
    )
}

export default Profile;
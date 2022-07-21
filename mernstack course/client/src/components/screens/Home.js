import React, {useState, useEffect} from "react";

const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/allposts', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {
            console.log(result)
            setData(result.posts)
        })
    }, [])

    return (
        <div className = "home">
            {
                data.map(item => {
                    return (
                        <div className = "card home-card" key ={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <div className = "card-image">
                                <img src = {item.photo}
                                alt = "Instagram image"
                                />
                            </div>
                            <div className = "card-content">
                            <i className ="material-icons" style = {{color: "red"}}>favorite</i>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type = "text" placeholder = "Add a comment" />
                            </div>
            </div>
                    )
                })
            }
            <div className = "card home-card">
                <h5>Masked Wolf</h5>
                <div className = "card-image">
                    <img src = "https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=2000"
                     alt = "Astronaut"
                    />
                </div>
                <div className = "card-content">
                <i className ="material-icons" style = {{color: "red"}}>favorite</i>
                    <h6>Upcoming Hit</h6>
                    <p>I feel like an astronaut in the ocean</p>
                    <input type = "text" placeholder = "Add a comment" />
                </div>
            </div>
        </div>
    )
}

export default Home;
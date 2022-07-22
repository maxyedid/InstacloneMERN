import React, {useState, useEffect, useContext} from "react";
import {UserContext} from '../../App'

const Home = () => {
    const [data, setData] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:4000/allposts', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {
            setData(result.posts)
        })
    }, [])

    const likePost = (id) => {
            fetch("http://localhost:4000/like", {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    postId: id
                })
            }).then(res => res.json()).then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result;
                    }
                    return item;
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const unlikePost = (id) => {
        fetch("http://localhost:4000/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json()).then(result => {
            const newData = data.map(item => {
                if (item._id == result._id) {
                    return result;
                }
                return item;
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
}

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
                            <i className ="material-icons"
                            onClick = {item.likes.includes(state._id)?() => unlikePost(item._id): () => likePost(item._id)}
                            style = {item.likes.includes(state._id)? {color:"red"}: {color: "black"}}>favorite</i>
                                <h6>{item.likes.length} likes</h6>
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
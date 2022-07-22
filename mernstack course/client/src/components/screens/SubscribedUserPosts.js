import React, {useState, useEffect, useContext} from "react";
import {UserContext} from '../../App'

const SubbedHome = () => {
    const [data, setData] = useState([])
    const {state} = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:4000/getsubpost', {
            method: "get",
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
                    if (item._id === result._id) {
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
                if (item._id === result._id) {
                    return result;
                }
                return item;
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
}
    const makeComment = (text, postId) => {
        fetch("http://localhost:4000/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json()).then(result => {
            console.log(result)
            const newData = data.map(item => {
                if (item._id === result._id) {
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
        <div key = "homepage" className = "home">
            {
                data.map(item => {
                    return (
                        <div className = "card home-card" key ={item._id}>
                            <h5 style = {{padding: "5px"}}><a href = {item.postedBy._id !== state._id?`/profile/${item.postedBy._id}`: "/profile"}>{item.postedBy.name}</a></h5>
                            <div className = "card-image">
                                <img src = {item.photo}
                                alt = ""
                                />
                            </div>
                            <div className = "card-content">
                            <i className ="material-icons"
                            onClick = {item.likes.includes(state._id)?() => unlikePost(item._id): () => likePost(item._id)}
                            style = {item.likes.includes(state._id)? {color:"red"}: {color: "black"}}>favorite</i>
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <form onSubmit = {(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                <input type = "text" placeholder = "Add a comment" />
                                </form>
                                {
                                    item.comments.map(record => {
                                        return (
                                            <h6 key = {record._id}><span style = {{fontWeight: "500"}}>{record.postedBy? record.postedBy.name : "loading"} : </span>{record.text? record.text: "loading"}</h6>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SubbedHome;
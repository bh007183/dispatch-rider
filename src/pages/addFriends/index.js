import React, {useState, useEffect} from 'react'
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import "./style.css"
import axios from 'axios'
import FriendSearchResults from "../../components/friendSearchResult"

export default function AddFriends() {
    const [findFriends, setFindFriends] = useState({
        friendSearch: "",
        // friendSearchResults: []
    })

    const [test, setTest] = useState({
        
        friendSearchResults: []
    })

    const handleInputChange = event => {
        let name =  event.target.name;
        let value =  event.target.value;
         setFindFriends({...findFriends, [name]: value})
         
         
        
        console.log(findFriends.friendSearch)
    }

    useEffect(() => {
        if(findFriends.friendSearch === ""){
            console.log("blob")
        }else{
            axios.get("http://localhost:8080/friendSearch/" + findFriends.friendSearch)
            .then(res => setTest({...test, friendSearchResults: res.data}))}
        
    }, [findFriends.friendSearch])

    const searchHandler = () => {
        
            axios.get("http://localhost:8080/friendSearch/exactsearch/" + findFriends.friendSearch)
            .then(res => setTest({...test, friendSearchResults: res.data}))
        
    }
    


    return (
        
            <Grid container>
                <Grid className="FindFriendInputContainer"container>
                <Grid item xs={9}>
                <input name="friendSearch" onChange={handleInputChange} value={findFriends.friendSearch} placeholder="Search Friends" className="FindFriendInput"></input>
                </Grid>
                <Grid item xs={3}>
                <Button className="FindFriendButton" onClick={searchHandler} variant="contained" color="primary"> Find</Button>
                </Grid>
                </Grid>
                <Grid className="resultsContainer" container>
                {test.friendSearchResults.map(friend => 
                findFriends.friendSearch !== "" ? <FriendSearchResults
                    key={friend.id}
                    id={friend.id}
                    firstName={friend.firstName}
                    lastName={friend.lastName}
                    />
                    : <></>
                )}
                </Grid>
                    
                
              

            </Grid>
            
    
    )
}

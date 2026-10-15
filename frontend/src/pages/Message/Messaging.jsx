import { useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import axios from "axios";
import SideBar from "../Home/SideBar";
import ConversationList from "../Home/ConversationList";
import SingleChat from "./Chat"
function Messaging(){
    const [allconvo, setallconvo] = useState('')
    const [messagingUser, setUser] = useState('')


     const { id } = useParams(); 
  useEffect(()=>{
    async function fetchallconversation(){
      let response = await axios.get("http://localhost:3000/conversations", {
                        headers: { 'Authorization': `${localStorage.getItem('token')}` }
                     })
    
      const {allconvo} = response.data
      setallconvo(allconvo)

    } fetchallconversation()
  }, [])

  useEffect(()=>{
    async function fetchmessages(){
        let response = await axios.get(`http://localhost:3000/conversations/${id}`, {
                        headers: { 'Authorization': `${localStorage.getItem('token')}` }
                     })

    const {singleConvo, otherUser} = response.data
    setUser(otherUser)
   
    } fetchmessages()
  }, [id])
    return (
         <div
className="min-h-screen grid grid-cols-[100px_280px_1fr] "
    >
        <SideBar/>
        <ConversationList
             allconvo={allconvo}
        />
        <SingleChat
        user={messagingUser}
        />
    </div>
    )
   
}
export default Messaging;
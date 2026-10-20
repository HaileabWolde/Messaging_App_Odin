import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import axios from  "axios";
function Conversations() {
  const [allconvo, setallconvo] = useState('')
  useEffect(()=>{
    async function fetchallconversation(){
      let response = await axios.get("http://localhost:3000/conversations", {
                        headers: { 'Authorization': `${localStorage.getItem('token')}` }
                     })
                  
      const {allconvo} = response.data
      setallconvo(allconvo)

    } fetchallconversation()
  }, [])
  return (
       <div 
       className="min-h-screen grid grid-cols-[100px_280px_1fr] ">
         <SideBar/>
         <ConversationList
         allconvo={allconvo}
         />
         <ChatWindow/>
    </div>
  )
}

export default Conversations;
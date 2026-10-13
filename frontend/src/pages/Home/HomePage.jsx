import { useEffect } from "react";
import SideBar from "./SideBar";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
function Conversations() {

  
  return (
       <div 
       className="min-h-screen grid grid-cols-[100px_280px_1fr] ">
         <SideBar/>
         <ConversationList/>
         <ChatWindow/>
    </div>
  )
}

export default Conversations;
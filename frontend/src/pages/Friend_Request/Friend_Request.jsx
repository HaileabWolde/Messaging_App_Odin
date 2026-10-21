import SideBar from "../Home/SideBar";
import ChatWindow from "../Home/ChatWindow";
import Friend_RequestList from "./FriendRequestlist";
function Friend_Request(){
return(
    <div
       className="min-h-screen grid grid-cols-[100px_300px_1fr]"

    >
        <SideBar/>
        <Friend_RequestList/>
        <ChatWindow/>

    </div>
)
}

export default Friend_Request;
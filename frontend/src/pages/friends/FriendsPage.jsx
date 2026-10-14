import SideBar from "../Home/SideBar";
import ChatWindow from "../Home/ChatWindow";
import FriendsList from "./FriendsList";
function Friends(){
    return (
        <div
        className="min-h-screen grid grid-cols-[100px_300px_1fr]"
        >
        <SideBar/>
       <FriendsList/>
        <ChatWindow/>

         </div>
    )
    
}
export default Friends
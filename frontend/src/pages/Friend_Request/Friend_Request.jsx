import { useEffect, useState } from "react";
import SideBar from "../Home/SideBar";
import ChatWindow from "../Home/ChatWindow";
import Friend_RequestList from "./FriendRequestlist";
import axios from "axios";
function Friend_Request(){

    const [activeTab, setActiveTab] = useState("sent");
const [sentRequests, setSentRequests] = useState([]);
const [receivedRequests, setReceivedRequests] = useState([]);

const displayedRequests =
  activeTab === "sent" ? sentRequests : receivedRequests;

 useEffect(() => {
  async function fetchRequests() {
    const token = localStorage.getItem("token");

    const [sent, received] = await Promise.all([
     
      axios.get("http://localhost:3000/allfriend-request-sent", {
        headers: { Authorization: token },
      }),
      axios.get("http://localhost:3000/allfriend-request-received", {
        headers: { Authorization: token },
      }),
    ]);

    setSentRequests(sent.data.allsentRequest);
    setReceivedRequests(received.data.allrecivedRequest);
  }

  fetchRequests();
}, []);
return(
    <div
       className="min-h-screen grid grid-cols-[100px_300px_1fr]"

    >
        <SideBar/>
       <Friend_RequestList
  friend_request={displayedRequests}
  activeTab={activeTab}
  setActiveTab={setActiveTab}
/>
        <ChatWindow/>

    </div>
)
}

export default Friend_Request;
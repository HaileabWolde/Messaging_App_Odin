import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineUserPlus,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

function FriendsList() {
  const [alluser, setallUser] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchallfriends() {
      try {
        const response = await axios.get("http://localhost:3000/allusers", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        setallUser(response.data.alluser || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchallfriends();
  }, []);

  async function handlemessage(id){
  
    try{
        const response = await axios.post("http://localhost:3000/conversations", {
              userId: id
        }, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }) 
      
     navigate(`/conversations/${response.data.convo.id}`)
    }   
    catch(error){
        console.log("error", error)
    }
  }

  async function handleFriendrequest(userId) {
   
    try{
      const response = await axios.post(`http://localhost:3000/friend-requests/${userId}`, 
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
       navigate('/sentfriendRequest')
    }
    catch(error){
      console.log("error", error.response)
    }
    
  }
  return (
    <div className="h-full bg-[#1e293b]">
      <div className="flex h-full flex-col px-2 py-8">
        <h2 className="mb-6 text-xl font-bold tracking-tight text-white">
          Suggested Users
        </h2>

        {alluser.length > 0 ? (
          <div className="flex flex-col gap-3">
            {alluser.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/40 p-3 transition hover:bg-slate-700/50"
              >
                {/* User info */}
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-400/30 bg-gradient-to-br from-indigo-400 to-violet-600 text-sm font-bold text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>

                  <h3 className="min-w-0 truncate text-sm font-semibold text-slate-100">
                    {user.username}
                  </h3>
                </div>

                {/* Action buttons */}
                <div className="flex shrink-0 items-center gap-2">
                  
                
                <button
                    type="button"
                    onClick={()=> handleFriendrequest(user.id)}
                    className="flex items-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
                  >
                    Add  
                  </button>

                
                  <button
                    type="button"
                    onClick={()=> handlemessage(user.id)}
                    className="font-serif cursor-pointer flex items-center gap-1.5 rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300"
                  >
                   
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="text-sm text-slate-400">
            No registered users
          </h3>
        )}
      </div>
    </div>
  );
}

export default FriendsList;
import { useState } from "react";
import axios from "axios";


function SingleChat({user, id,  allchats}){
   //token fetching
  const token = localStorage.getItem('token')
  const decoded = JSON.parse(atob(token.split('.')[1])) 

    const [message, setMessage] = useState('')

    async function handleSendingMessage(){
       let response = await axios.post(`http://localhost:3000/conversations/${id}`, {message: message}, {
                        headers: { 'Authorization': `${localStorage.getItem('token')}` }
                     })
      // console.log(response)
    }
    return (
        <div
         className="bg-[#162032] flex flex-col h-full"
        >
            <header
            className="bg-[#1e293b]  p-6  border-b border-[#334155]"
            >
                <span
                className="flex gap-2 items-center"
                >
                     <div
                className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-600 bg-gradient-to-br from-indigo-400 to-violet-600 text-sm font-bold text-white transition hover:border-indigo-400"
               >
                    {user?.username?.toUpperCase()?.charAt(0)}
               </div>
                <p
                className="text-xl font-bold tracking-tight text-white"
                >
                    {user?.username}
                    
                </p>
                </span>
              

            </header>
            <div
           className="flex-1 flex flex-col gap-4 p-4"
            >
              {
                allchats.map((chat)=> {
                  return (
                      <div
                  key={chat.id}
                 className={`flex ${
  String(chat.senderId) === String(decoded.sub)
    ? "self-end"
    : "self-start"
}`}
                  >
                    <h1
                     className="text-xl font-bold tracking-tight text-white"
                    >
                      {
                      chat.content
                    }
                      </h1>
                  </div>
                  )
                  
                })
              }
            </div>
            <footer
              className="bg-[#1e293b] p-4 rounded-sm border-t border-[#334155] mt-auto flex gap-4 justify-center"
            >
                 <input
              id="message"
              name="message"
              required
              value={message}
              onChange={(event)=>{
              
                setMessage(event.target.value)
              }}
              type="text"
              placeholder="Type Your Text Here"   
            className="w-[80%] rounded-xl border border-[#334155]
           bg-[#162032] px-5 py-2
           text-[#f1f5f9] placeholder:text-[#94a3b8]
           outline-none transition-all duration-200
           focus:border-[#60a5fa] focus:ring-2
           focus:ring-[#60a5fa]/20"
            />
             <button
            onClick={handleSendingMessage}
           className="rounded-xl bg-indigo-500 px-6 
  font-semibold text-white shadow-md shadow-indigo-500/20
  transition-all duration-200
  hover:bg-indigo-400
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-indigo-300 focus-visible:ring-offset-2
  focus-visible:ring-offset-[#1e293b]
  active:scale-[0.99] font-serif cursor-pointer"
          >
          
          Send
           
          </button>
            </footer>

        </div>
    )
}
export default SingleChat;
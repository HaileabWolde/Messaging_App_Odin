function SingleChat({user}){
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
            className="flex-1"
            >

            </div>
            <footer
              className="bg-[#1e293b] p-6 rounded-sm border-t border-[#334155] mt-auto"
            >

            </footer>

        </div>
    )
}
export default SingleChat;
import { HiOutlineXMark } from "react-icons/hi2";
function Group_Modal({setIsModalOpen, groupMembers, groupname}){

     function handleCloseModal() {
        setIsModalOpen(false);
      }
    return (
        <div
         className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                  onClick={handleCloseModal}
        >
            <div
              className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#1e293b] p-6 text-slate-100 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
            >
                {/* Modal header */}
                         <div className="mb-6 flex items-center justify-between">
                                      <div className="flex items-center gap-3">
      
                                       
                                         <h1 className="text-xl font-bold text-white">
                                                                            Groups Info
                                             </h1>
                                      </div>
                        
                                      <button
                                        onClick={handleCloseModal}
                                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
                                        aria-label="Close modal"
                                      >
                                        <HiOutlineXMark size={22} />
                                      </button>
                         </div>
                         <div className="flex items-center gap-6 ">
                                             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 text-lg font-bold text-white shadow-lg">
                                                          {groupname?.charAt(0)?.toUpperCase()}
                                          </div>
                                          <div
                                          className="flex flex-col"
                                          >
                                             <h1 className="text-lg font-bold text-white">
                                                                         {groupname}
                                             </h1>
                                             <p className="mt-1 text-md text-slate-400">
                                                               {groupMembers.length} Memebers
                                                </p>
                                          </div>
                         </div>
            </div>
        </div>
    )
}
export default Group_Modal;
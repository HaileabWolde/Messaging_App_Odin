
import {
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlinePaperAirplane,
  HiOutlineCheck,
  HiOutlineXMark,
} from "react-icons/hi2";
import axios from "axios";
function Friend_RequestList({
  friend_request = [],
  activeTab,
  setActiveTab,
 
}) {

  async function onAccept(id){

    try{
       const response = await axios.patch(`http://localhost:3000/acceptfriendrequest/${id}`,
      {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
    }
    catch(error){
      console.log(error.response.data)
    }
   
  }

  async function onDecline(id){
    const response = await axios.patch(`http://localhost:3000/rejectfriendrequest/${id}`, 
      {},
       {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
    )
  }
  return (
    <div className="h-full min-h-0 overflow-y-auto border-r border-slate-700/60 bg-[#1e293b]">
      <div className="flex min-h-full flex-col px-4 py-7">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Friend Requests
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage your connections
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 rounded-xl border border-slate-700/60 bg-slate-900/40 p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("sent")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
              activeTab === "sent"
                ? "bg-indigo-500 text-white"
                : "bg-slate-700 text-slate-300"
            }`}
          >
            <HiOutlinePaperAirplane className="h-4 w-4" />
            Sent
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("received")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
              activeTab === "received"
                ? "bg-indigo-500 text-white"
                : "bg-slate-700 text-slate-300"
            }`}
          >
            <HiOutlineUserGroup className="h-4 w-4" />
            Received
          </button>
        </div>

        {/* Section heading */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {activeTab === "sent"
              ? "Sent requests"
              : "Received requests"}
          </h3>

          <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-xs font-semibold text-indigo-300">
            {friend_request.length}
          </span>
        </div>

        {/* Request list */}
        <div className="flex flex-col gap-3">
          {friend_request.length > 0 ? (
            friend_request.map((friend) => {
              const user =
                activeTab === "sent"
                  ? friend.receiver
                  : friend.sender;

              return (
                <div
                  key={friend.id}
                  className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4 transition hover:border-indigo-400/40"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-indigo-400/30 bg-gradient-to-br from-indigo-400 to-violet-600 text-base font-bold text-white">
                      {user?.username?.charAt(0).toUpperCase() || "?"}
                    </div>

                    {/* User details */}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-slate-100">
                        {user?.username || "Unknown user"}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5">
                        <HiOutlineClock className="h-3.5 w-3.5 text-amber-400" />
                        <p className="text-xs text-slate-400">
                          {friend.status}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <p className="shrink-0 text-[11px] text-slate-500">
                      {friend.createdAt
                        ? new Date(friend.createdAt).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric" }
                          )
                        : ""}
                    </p>
                  </div>

                  {/* Received request actions */}
                  {activeTab === "received" && (
                    <div className="mt-4 border-t border-slate-700/60 pt-3">
                      <p className="mb-3 text-sm text-slate-300">
                        <span className="font-semibold text-white">
                          {user?.username || "This user"}
                        </span>{" "}
                        wants to be your friend.
                      </p>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => onAccept?.(user.id)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
                        >
                          <HiOutlineCheck className="h-4 w-4" />
                          Accept
                        </button>

                        <button
                          type="button"
                          onClick={() => onDecline?.(user.id)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-700/60 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <HiOutlineXMark className="h-4 w-4" />
                          Decline
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Sent request status */}
                  {activeTab === "sent" && (
                    <div className="mt-3">
                      <span className="inline-block rounded-md bg-slate-700/60 px-2 py-1 text-xs font-medium text-slate-300">
                        Request sent
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-700 px-4 py-12 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800">
                <HiOutlineUserGroup className="h-7 w-7 text-slate-500" />
              </div>

              <h3 className="text-sm font-semibold text-slate-200">
                {activeTab === "sent"
                  ? "No sent requests"
                  : "No received requests"}
              </h3>

              <p className="mt-2 max-w-[220px] text-xs leading-5 text-slate-500">
                {activeTab === "sent"
                  ? "When you send someone a friend request, it will show up here."
                  : "When someone sends you a friend request, it will show up here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Friend_RequestList;

import {
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";

function Friend_RequestList({ friend_request, activeTab, setActiveTab}) {
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
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-3 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-400"
          >
            <HiOutlinePaperAirplane className="h-4 w-4" />
            Sent
          </button>

          <button
           onClick={() => setActiveTab("received")}
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-700/70 hover:text-white"
          >
            <HiOutlineUserGroup className="h-4 w-4" />
            Received
          </button>
        </div>

        {/* Section heading */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
           {activeTab === "sent" ? "Sent requests" : "Received requests"}
          </h3>

          <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-xs font-semibold text-indigo-300">
            {friend_request.length}
          </span>
        </div>

        {/* Request list */}
        <div className="flex flex-col gap-3">
          {friend_request.length > 0 ? (
            friend_request.map((friend) => {
              const receiver = activeTab === "sent" ? friend.receiver : friend.sender

              return (
                <div
                  key={friend.id}
                  className="group flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/50 p-3 transition duration-200 hover:border-indigo-400/40 hover:bg-slate-800"
                >
                  {/* Avatar */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-indigo-400/30 bg-gradient-to-br from-indigo-400 to-violet-600 text-base font-bold text-white shadow-sm">
                    {receiver?.username?.charAt(0).toUpperCase() || "?"}
                  </div>

                  {/* User details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-slate-100 transition group-hover:text-indigo-300">
                      {receiver?.username || "Unknown user"}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5">
                      <HiOutlineClock className="h-3.5 w-3.5 text-amber-400" />
                      <p className="text-xs text-slate-400">
                        {friend?.status}
                      </p>
                    </div>
                  </div>

                  {/* Request date */}
                  <div className="shrink-0 text-right">
                    <p className="text-[11px] text-slate-500">
                      {friend.createdAt
                        ? new Date(friend.createdAt).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric" }
                          )
                        : ""}
                    </p>
                    <span className="mt-1 inline-block rounded-md bg-slate-700/60 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                      Sent
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-700 px-4 py-12 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800">
                <HiOutlineUserGroup className="h-7 w-7 text-slate-500" />
              </div>

              <h3 className="text-sm font-semibold text-slate-200">
                No sent requests
              </h3>

              <p className="mt-2 max-w-[220px] text-xs leading-5 text-slate-500">
                When you send someone a friend request, it will show up here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Friend_RequestList;
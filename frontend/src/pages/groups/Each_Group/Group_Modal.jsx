
import { HiOutlineXMark, HiOutlineUserGroup } from "react-icons/hi2";

function Group_Modal({ setIsModalOpen, groupMembers = [], groupname }) {

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleCloseModal}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-700 bg-[#1e293b] p-6 text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <HiOutlineUserGroup size={20} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-white">
                Group Info
              </h1>
              <p className="text-xs text-slate-400">
                Manage group members
              </p>
            </div>
          </div>

          <button
            onClick={handleCloseModal}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            aria-label="Close modal"
          >
            <HiOutlineXMark size={22} />
          </button>
        </div>

        {/* Group Profile */}
        <div className="flex items-center gap-4 border-b border-slate-700 pb-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 text-2xl font-bold text-white shadow-lg">
            {groupname?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-white">
              {groupname}
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              {groupMembers.length} members
            </p>
          </div>
        </div>

        {/* Members Section */}
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-300">
              Members
            </h2>

            <span className="text-xs text-slate-500">
              {groupMembers.length} people
            </span>
          </div>

          <div className="flex max-h-64 flex-col gap-3 overflow-y-auto pr-2">
            {groupMembers.map((each) => {
              const { user } = each;

              return (
                <div
                  key={user.id}
                  className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-700/50"
                >
                  {/* Member Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 text-sm font-bold text-white shadow-md">
                    {user?.username?.charAt(0)?.toUpperCase()}
                  </div>

                  {/* Member Details */}
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-white">
                      {user?.username}
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Group member
                    </p>
                  </div>
                </div>
              );
            })}

            {groupMembers.length === 0 && (
              <p className="py-6 text-center text-sm text-slate-400">
                No members found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Group_Modal;

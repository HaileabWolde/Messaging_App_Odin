
import { useState } from "react";
import {
  HiPlus,
  HiOutlineXMark,
  HiOutlineUserGroup,
} from "react-icons/hi2";

function Group_List({ users = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  function handleUserSelection(userId) {
    setSelectedUsers((previousUsers) =>
      previousUsers.includes(userId)
        ? previousUsers.filter((id) => id !== userId)
        : [...previousUsers, userId]
    );
  }

  function handleCreateGroup() {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }

    if (selectedUsers.length === 0) {
      alert("Please select at least one member");
      return;
    }

    const groupData = {
      name: groupName.trim(),
      memberIds: selectedUsers,
    };

    console.log("Group data:", groupData);

    // Send groupData to your backend here.

    setGroupName("");
    setSelectedUsers([]);
    setIsModalOpen(false);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="relative h-full min-h-0 border-r border-slate-700/60 bg-[#1e293b]">

      {/* Create group button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-4 right-4 rounded-xl bg-slate-700 p-3 text-slate-200 transition hover:bg-slate-600"
        title="Create group"
        aria-label="Create group"
      >
        <HiPlus size={24} />
      </button>

      {/* Create group modal */}
      {isModalOpen && (
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
                <div className="rounded-xl bg-blue-500/15 p-2 text-blue-400">
                  <HiOutlineUserGroup size={24} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    Create a group
                  </h2>
                  <p className="text-sm text-slate-400">
                    Start a conversation with your friends
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
                aria-label="Close modal"
              >
                <HiOutlineXMark size={22} />
              </button>
            </div>

            {/* Group name */}
            <label
              htmlFor="groupName"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Group name
            </label>

            <input
              id="groupName"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g. Project team"
              className="mb-6 w-full rounded-xl border border-slate-700 bg-[#162032] p-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
            <label
              className="mb-2 block text-sm font-medium text-slate-300"
            >
                Add Members
            </label>
           <div className="mb-4 flex flex-wrap gap-2">
         {users
                  .filter((user) => selectedUsers.includes(user.id))
                  .map((user) => (
                             <div
                           key={user.id}
                           className="flex items-center gap-2 rounded-full bg-slate-700 px-3 py-2 text-sm text-white"
                          >
                               <span>{user.username}</span>

                               <button
                              type="button"
                           onClick={() => handleUserSelection(user.id)}
                        className="text-slate-400 hover:text-white"
                       aria-label={`Remove ${user.username}`}
                           >
                           <HiOutlineXMark size={16} />
                            </button>
                       </div>
                 ))}
                  </div>

            {/* Member selection */}
            <div className="mb-3 flex items-center justify-between">
              

              <span className="text-xs text-slate-400">
                {selectedUsers.length} selected
              </span>
            </div>

            <div className="max-h-64 space-y-1 overflow-y-auto">
              {users.length > 0 ? (
                users.map((user) => (
                  <label
                    key={user.id}
                    className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition hover:bg-slate-700/60"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleUserSelection(user.id)}
                      className="h-4 w-4 accent-blue-500"
                    />

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 font-medium text-slate-200">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>

                    <span className="flex-1 text-sm font-medium">
                      {user.username}
                    </span>
                  </label>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-slate-400">
                  No users available to add.
                </p>
              )}
            </div>

            {/* Modal actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 rounded-xl border border-slate-700 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateGroup}
                disabled={!groupName.trim() || selectedUsers.length === 0}
                className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Group_List;

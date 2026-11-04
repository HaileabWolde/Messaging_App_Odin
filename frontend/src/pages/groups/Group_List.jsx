
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IsModalOpen from "./IsModal";
import {
  HiPlus,
  HiOutlineUserGroup,
  HiMagnifyingGlass,
} from "react-icons/hi2";

function Group_List({ users = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroupList] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const avatarColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-indigo-500",
    "bg-cyan-600",
    "bg-rose-500",
  ];

  function getAvatarColor(username) {
    if (!username) return avatarColors[0];

    const colorIndex =
      username
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0) %
      avatarColors.length;

    return avatarColors[colorIndex];
  }

  useEffect(() => {
    async function getallgroupConvo() {
      try {
        const response = await axios.get(
          "http://localhost:3000/allgroupconvo",
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        setGroupList(response.data.allGroupConvo);
      } catch (error) {
        console.log(error.response);
      }
    }

    getallgroupConvo();
  }, []);

  function formatTime(date) {
    if (!date) return "";

    const messageDate = new Date(date);
    const now = new Date();

    const isToday =
      messageDate.toDateString() === now.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return messageDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  }

  const filteredGroups = groups.filter((group) =>
    group.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative flex h-full min-h-0 flex-col border-r border-slate-700/60 bg-[#1e293b]">

      {/* Header */}
      <div className="border-b border-slate-700/60 px-5 py-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">
              Groups
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Your group conversations
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-blue-600 p-2.5 text-white transition hover:bg-blue-500"
            title="Create group"
            aria-label="Create group"
          >
            <HiPlus size={21} />
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 rounded-xl bg-[#162032] px-3 py-3">
          <HiMagnifyingGlass
            className="shrink-0 text-slate-400"
            size={19}
          />

          <input
            type="text"
            placeholder="Search groups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Group list */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        {filteredGroups.length > 0 ? (
          <>
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Your groups
            </p>

            <div className="space-y-1">
              {filteredGroups.map((group) => {
                const { name, messages = [] } = group;
                const latestMessage = messages[0];

                return (
                  <button
                    key={group.id}
                    onClick={() =>
                      navigate(`/groupconversations/${group.id}`)
                    }
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#334155]"
                  >
                    {/* Avatar */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${getAvatarColor(name)}`}
                    >
                      {name?.charAt(0)?.toUpperCase() ?? "?"}
                    </div>

                    {/* Group details */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <h2 className="truncate font-semibold text-white">
                          {name ?? "Unnamed group"}
                        </h2>

                        <span className="shrink-0 text-xs text-slate-500">
                          {formatTime(latestMessage?.createdAt)}
                        </span>
                      </div>

                      <p className="truncate text-sm text-slate-400">
                        {latestMessage
                          ? `${
                              latestMessage.sender?.username
                                ? latestMessage.sender.username + ": "
                                : ""
                            }${latestMessage.content ?? "Image"}`
                          : "No messages yet"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-5 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-700/60">
              <HiOutlineUserGroup
                size={32}
                className="text-slate-300"
              />
            </div>

            <h2 className="mb-2 font-semibold text-white">
              {search ? "No groups found" : "No groups yet"}
            </h2>

            <p className="max-w-[220px] text-sm leading-relaxed text-slate-400">
              {search
                ? "Try searching with another group name."
                : "Create a group with your friends and start a conversation."}
            </p>

            {!search && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Create your first group
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create group modal */}
      {isModalOpen && (
        <IsModalOpen
          users={users}
          setIsModalOpen={setIsModalOpen}
          setGroupList={setGroupList}
        />
      )}
    </div>
  );
}

export default Group_List;

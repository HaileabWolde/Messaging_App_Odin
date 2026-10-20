
import { Link } from "react-router-dom";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserPlus,
} from "react-icons/hi2";

function ConversationList({ allconvo }) {
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

  return (
    <div className="h-full bg-[#1e293b] border-r border-[#334155]">
      {allconvo.length > 0 ? (
        <div className="flex flex-col px-2 py-8">
          {allconvo.map((convo) => {
            const { members, messages } = convo;
            const username = members[0]?.user?.username;
            const latestMessage = messages[0]?.content;

            return (
              <Link
                to={`/conversations/${convo.id}`}
                key={convo.id}
                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-[#334155]"
              >
                {/* Avatar */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg ${getAvatarColor(username)}`}
                >
                  {username?.charAt(0)?.toUpperCase() ?? "?"}
                </div>

                {/* Username and latest message */}
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold text-white">
                    {username ?? "Unknown user"}
                  </h2>

                  <p className="truncate text-sm text-slate-400">
                    {latestMessage ?? "No messages yet"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-600/50 bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl shadow-black/10">
            <HiOutlineChatBubbleLeftRight
              size={38}
              className="text-indigo-400"
            />
          </div>

          <h2 className="mb-3 text-xl font-bold tracking-tight text-white">
            No conversations yet
          </h2>

          <p className="max-w-xs text-sm leading-6 text-slate-400">
            Your inbox is waiting for its first hello. Find people, connect
            with friends, and start a conversation.
          </p>

          <Link
            to="/friends"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 hover:shadow-indigo-500/30 active:translate-y-0"
          >
            <HiOutlineUserPlus size={20} />
            Find People
          </Link>

          <p className="mt-5 text-xs text-slate-500">
            Good conversations start with a hello.
          </p>
        </div>
      )}
    </div>
  );
}

export default ConversationList;

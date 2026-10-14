import {Link} from "react-router-dom"
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserPlus,
} from "react-icons/hi2";

function ConversationList({ allconvo }) {
  return (
    <div className="h-full bg-[#1e293b]">
      {allconvo.length > 0 ? (
        <div>
          {/* Conversation items will go here */}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">

          {/* Empty state icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-600/50 bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl shadow-black/10">
            <HiOutlineChatBubbleLeftRight
              size={38}
              className="text-indigo-400"
            />
          </div>

          {/* Heading */}
          <h2 className="mb-3 text-xl font-bold tracking-tight text-white">
            No conversations yet
          </h2>

          {/* Description */}
          <p className="max-w-xs text-sm leading-6 text-slate-400">
            Your inbox is waiting for its first hello. Find people, connect
            with friends, and start a conversation.
          </p>

          {/* Action button */}
          <Link
            to="/friends"
            type="button"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 hover:shadow-indigo-500/30 active:translate-y-0"
          >
            <HiOutlineUserPlus size={20} />
            Find People
          </Link>

          {/* Footer hint */}
          <p className="mt-5 text-xs text-slate-500">
            Good conversations start with a hello.
          </p>
        </div>
      )}
    </div>
  );
}

export default ConversationList;
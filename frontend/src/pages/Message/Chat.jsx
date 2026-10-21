
import { useState } from "react";
import axios from "axios";
import {
  HiOutlinePaperAirplane,
  HiOutlinePaperClip,
  HiOutlineFaceSmile,
} from "react-icons/hi2";

function SingleChat({ user, id, allchats }) {
  const token = localStorage.getItem("token");
  const decoded = JSON.parse(atob(token.split(".")[1]));

  const [message, setMessage] = useState("");
   const [image, setImage] = useState(null);
  const [error, setError] = useState("");


  async function handleSendingMessage(e) {
    e.preventDefault();
    setError('')
    if (!message.trim() && !image) return;

    const formData = new FormData();

    formData.append("message", message);

    if (image) {
      formData.append("image", image);
    }


  
    try {
      const response = await axios.post(
        `http://localhost:3000/conversations/${id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);

      setMessage("");
      setImage(null);
    } catch (error) {
      setError(
      error.response?.data?.message || "Failed to send message."
    );
    }
  }
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#0b141e] text-slate-100">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/5 bg-[#17212b] px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 text-lg font-bold text-white shadow-lg">
            {user?.username?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold text-white">
              {user?.username}
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Personal chat
            </p>
          </div>
        </div>

       
      </header>

      {/* Messages */}
      <main className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-6 sm:px-6">
        {(allchats || []).length === 0 && (
          <div className="flex flex-1 items-center justify-center">
            <div className="rounded-2xl bg-[#17212b] px-6 py-4 text-center shadow-sm">
              <p className="font-medium text-slate-200">
                Start a conversation
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Send a message to say hello.
              </p>
            </div>
          </div>
        )}

        {(allchats || []).map((chat) => {
          const isMine =
            String(chat.senderId) === String(decoded.sub);

          return (
            <div
              key={chat.id}
              className={`flex w-full  ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] flex flex-col gap-1 rounded-2xl px-4 py-2.5 shadow-sm sm:max-w-[70%] ${
                                 isMine
                               ? "rounded-br-md bg-[#2b7de9] text-white"
                    : "rounded-bl-md border border-white/5 bg-[#182533] text-slate-100"
                      }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-6">
                  {chat.content}
                </p>
                {chat.imageUrl && (
            <img
              src={chat.imageUrl}
               alt="Shared image"
           className="block max-h-80 w-full max-w-sm rounded-xl object-cover transition-opacity hover:opacity-95"
            />
              )}
                <div
                  className={`text-right text-[10px] ${
                    isMine ? "text-blue-100/80" : "text-slate-400"
                  }`}
                >
                  {chat.createdAt
                    ? new Date(chat.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
              </div>
              
            </div>
          );
        })}
      </main>

      {/* Message input */}
      <footer className="border-t border-white/5 bg-[#17212b] px-3 py-3 sm:px-5 sm:py-4">
        <form
          onSubmit={handleSendingMessage}
          className="flex items-center gap-2 sm:gap-3"
        >
          <label
          className="cursor-pointer text-white"
  
          >
            <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
          />
            <HiOutlinePaperClip size={22} />
          </label>

          <div className="flex min-w-0 flex-1 items-center rounded-2xl border border-white/5 bg-[#0e1924] px-3 transition focus-within:border-sky-500/50 sm:px-4">
            <input
              id="message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              type="text"
              placeholder="Write a message..."
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              aria-label="Emoji"
              className="shrink-0 p-2 text-slate-400 transition hover:text-sky-400"
            >
              <HiOutlineFaceSmile size={21} />
            </button>
          </div>

          <button
            type="submit"
            disabled={!message.trim() && !image}
            aria-label="Send message"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3390ec] text-white shadow-md shadow-blue-950/30 transition hover:bg-[#4ba3ff] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
          >
            <HiOutlinePaperAirplane
              size={21}
              className="-translate-x-px"
            />
          </button>
        </form>
        {error && (
         <p className="text-sm text-red-400">
              {error}
          </p>
        )}
      </footer>
    </div>
  );
}

export default SingleChat;

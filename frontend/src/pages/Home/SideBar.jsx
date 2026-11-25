import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserPlus,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiOutlineUserGroup
} from "react-icons/hi2";
import UserProfile from "./UserProfile";

function SideBar() {
  // Token fetching
  const [ismodalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");
  const decoded = JSON.parse(atob(token.split(".")[1]));

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/profile",
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        );

        console.log(response.data.user);
        setProfile(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }

    getProfile();
  }, []);

  return (
    <div className="flex h-full flex-col items-center border-r border-slate-700/60 bg-[#0f172a] py-6">

      {/* App logo */}
      <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
        <HiOutlineChatBubbleLeftRight size={24} />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-5">

        {/* Conversations */}
        <NavLink
          to="/conversations"
          title="Conversations"
          aria-label="Conversations"
          className={({ isActive }) =>
            `relative flex h-11 w-11 items-center justify-center rounded-xl transition ${
              isActive
                ? "bg-indigo-500/15 text-indigo-400"
                : "text-slate-400 hover:bg-slate-700/70 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute -left-4 h-7 w-1 rounded-r-full bg-indigo-400" />
              )}
              <HiOutlineChatBubbleLeftRight size={24} />
            </>
          )}
        </NavLink>

        {/* Find people */}
        <NavLink
          to="/find_people"
          title="Find people"
          aria-label="Find people"
          className={({ isActive }) =>
            `relative flex h-11 w-11 items-center justify-center rounded-xl transition ${
              isActive
                ? "bg-indigo-500/15 text-indigo-400"
                : "text-slate-400 hover:bg-slate-700/70 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute -left-4 h-7 w-1 rounded-r-full bg-indigo-400" />
              )}
              <HiOutlineUserPlus size={24} />
            </>
          )}
        </NavLink>

        {/* Friend Requests */}
        <NavLink
          to="/friend_request"
          title="Friend Request"
          aria-label="Friend Request"
          className={({ isActive }) =>
            `relative flex h-11 w-11 items-center justify-center rounded-xl transition ${
              isActive
                ? "bg-indigo-500/15 text-indigo-400"
                : "text-slate-400 hover:bg-slate-700/70 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute -left-4 h-7 w-1 rounded-r-full bg-indigo-400" />
              )}
              <HiOutlineUsers size={24} />
            </>
          )}
        </NavLink>

        {/* Groups */}
        <NavLink
          to="/groups"
          title="Groups"
          aria-label="Groups"
          className={({ isActive }) =>
            `relative flex h-11 w-11 items-center justify-center rounded-xl transition ${
              isActive
                ? "bg-indigo-500/15 text-indigo-400"
                : "text-slate-400 hover:bg-slate-700/70 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute -left-4 h-7 w-1 rounded-r-full bg-indigo-400" />
              )}
              <HiOutlineUserGroup size={24} />
            </>
          )}
        </NavLink>

      </nav>

      {/* Bottom actions */}
      <div className="mt-auto flex flex-col items-center gap-5">

        {/* Settings */}
        <button
          title="Settings"
          aria-label="Settings"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-700/70 hover:text-white"
          onClick={() => setIsModalOpen(true)}
        >
          <HiOutlineCog6Tooth size={24} />
        </button>

        {/* Profile modal */}
        {ismodalOpen && (
          <UserProfile
            setIsModalOpen={setIsModalOpen}
            profile={profile}
          />
        )}

        {/* Profile */}
        <button
          title="My profile"
          aria-label="My profile"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-600 bg-gradient-to-br from-indigo-400 to-violet-600 text-sm font-bold text-white transition hover:border-indigo-400"
        >
          {decoded.username.toUpperCase().charAt(0)}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0f172a] bg-emerald-400" />
        </button>

      </div>
    </div>
  );
}

export default SideBar;
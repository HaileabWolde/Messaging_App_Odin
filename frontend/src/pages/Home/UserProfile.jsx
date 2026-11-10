
import { useState } from "react";
import { HiOutlineXMark, HiOutlineCog6Tooth, HiOutlineCamera } from "react-icons/hi2";

function UserProfile({ setIsModalOpen, decoded }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleCloseModal}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#1e293b] p-6 text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <HiOutlineCog6Tooth size={24} />
            </div>
            <h1 className="text-lg font-bold text-white">Settings</h1>
          </div>

          <button
            onClick={handleCloseModal}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
          >
            <HiOutlineXMark size={22} />
          </button>
        </div>

        {/* Profile Photo */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 text-3xl font-bold text-white">
             {decoded.username.toUpperCase().charAt(0)}
            </div>

            <label
              htmlFor="profile-photo"
              className="absolute bottom-0 right-0 cursor-pointer rounded-full border-2 border-[#1e293b] bg-blue-600 p-2 text-white transition hover:bg-blue-500"
            >
              <HiOutlineCamera size={18} />
            </label>

            <input
              type="file"
              id="profile-photo"
              accept="image/*"
              className="hidden"
            />
          </div>

          <p className="mt-3 text-sm text-slate-400">
            Change profile photo
          </p>
        </div>

        {/* About Me */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-300">
              About Me
            </h2>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditing ? (
            <textarea
              rows={4}
              maxLength={150}
              placeholder="Write something about yourself..."
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          ) : (
            <p className="min-h-12 rounded-xl bg-slate-800/60 p-3 text-sm text-slate-400">
              No bio added yet.
            </p>
          )}
        </div>

        {/* Update Button */}
        <button className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
          Update Changes
        </button>

        {/* Sign Out */}
        <div className="mt-5 border-t border-slate-700 pt-5">
          <button className="w-full rounded-xl border border-red-500/30 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

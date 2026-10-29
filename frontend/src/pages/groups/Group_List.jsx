import { useState, useEffect } from "react";
import IsModalOpen from "./IsModal";
import { HiPlus } from "react-icons/hi2";

function Group_List({ users = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroupList] = useState([]);

  return (
    <div className="relative h-full min-h-0 border-r border-slate-700/60 bg-[#1e293b]">

      {groups.length > 0 ? (
        groups.map((group) => (
          <div key={group.id}>
            {group.name}
          </div>
        ))
      ) : (
        <div>
          No groups yet
        </div>
      )}

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
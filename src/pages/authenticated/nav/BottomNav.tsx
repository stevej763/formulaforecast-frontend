import { UserGroupIcon, TrophyIcon, CalendarIcon } from "@heroicons/react/24/solid";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black/90 border-t border-gray-800 flex items-center py-2 z-50">
      <button
        className={`flex-1 flex flex-col items-center ${activeTab === "team" ? "text-red-600" : "text-gray-400"} hover:text-red-400 active:text-red-700 focus:outline-none`}
        onClick={() => setActiveTab("team")}
      >
        <UserGroupIcon className="h-6 w-6 mb-1" />
        <span className="text-xs font-semibold">Team</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center ${activeTab === "leaderboard" ? "text-red-600" : "text-gray-400"} hover:text-white active:text-gray-400 focus:outline-none`}
        onClick={() => setActiveTab("leaderboard")}
      >
        <TrophyIcon className="h-6 w-6 mb-1" />
        <span className="text-xs font-semibold">Leaderboard</span>
      </button>
      <button
        className={`flex-1 flex flex-col items-center ${activeTab === "calendar" ? "text-red-600" : "text-gray-400"} hover:text-blue-300 active:text-blue-600 focus:outline-none`}
        onClick={() => setActiveTab("calendar")}
      >
        <CalendarIcon className="h-6 w-6 mb-1" />
        <span className="text-xs font-semibold">Race Calendar</span>
      </button>
    </nav>
  );
}

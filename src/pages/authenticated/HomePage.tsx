import { useState, useEffect } from "react";
import Header from "./nav/Header";
import BottomNav from "./nav/BottomNav";
import TeamView from "./team/TeamView";
import RaceCalendar from "./racecalendar/RaceCalendar";
import Leaderboard from "./leaderboard/Leaderboard";
import Account from "./account/Account";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("activeTab") || "team");
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
      localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const renderSelectedTabContent = (tab: string) => {
    switch (tab) {
      case "team":
        return <TeamView />;
      case "leaderboard":
        return <Leaderboard />;
      case "calendar":
        return <RaceCalendar />;
      default:
        <TeamView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-red-900">
      <Header onAccountClick={() => setShowAccount(true)} />
      <div className="mt-16 mb-16 flex-1 overflow-auto ff-scrollbar">
        {renderSelectedTabContent(activeTab)}
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {showAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative">
            <button
              onClick={() => setShowAccount(false)}
              className="absolute top-2 right-2 text-gray-700 bg-white rounded-full px-2 py-1 shadow hover:bg-gray-200"
              aria-label="Close"
            >
              &times;
            </button>
            <Account />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

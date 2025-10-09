import {useState } from "react";
import GlobalLeaderboardTab from "./tabs/GlobalChampionshipLeaderboardView";
import UserChampionshipsView from "./tabs/UserChampionshipsLeadboardView";
import CreateChampionshipsView from "./tabs/CreateChampionshipsView";
import FfSubTabs, { type TabOption } from "../../../shared/components/FfSubTabs";
const Leaderboard = () => {

  const tabOptions: TabOption[] = [
    { key: "global", label: "Global Championship" },
    { key: "user", label: "My Championships" },
    { key: "create", label: "Create Championship" },
  ];

  const [activeTab, setActiveTab] = useState(tabOptions[0].key);

const renderActiveLeaderboardTab = () => {
  switch (activeTab) {
    case "global":
      return <GlobalLeaderboardTab />;
    case "user":
      return (
        <UserChampionshipsView />
      );
    case "create":
      return (
        <CreateChampionshipsView />
      );
    default:
      return <GlobalLeaderboardTab />;
  }
};


  return (
    <div className="w-full">
      <FfSubTabs tabOptions={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full max-w-lg bg-white/5 rounded-xl shadow-lg p-8 flex flex-col items-center mt-4 mx-auto">
          {renderActiveLeaderboardTab()}
      </div>
    </div>
  );
};

export default Leaderboard;

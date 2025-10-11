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
    <div className="w-full h-full flex flex-col">
      <FfSubTabs tabOptions={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 pt-[57px]">
          {renderActiveLeaderboardTab()}
      </div>
    </div>
  );
};

export default Leaderboard;

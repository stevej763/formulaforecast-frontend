// src/app/home/account/page.tsx
import { useState } from "react";
import MyTeamTab from "./tabs/MyTeamTab";
import FfSubTabs from "../../../shared/components/FfSubTabs";
import PredictionView from "./tabs/PreditionTab";
<<<<<<< Updated upstream
=======
import type { TabOption } from "../../../shared/components/FfSubTabs";

>>>>>>> Stashed changes

export default function TeamView() {

  const tabOptions = [
    { key: "team", label: "My Team" },
    { key: "predictions", label: "Predictions" },
    { key: "stats", label: "Stats" },
  ];

<<<<<<< Updated upstream
  const [activeTab, setActiveTab] = useState(tabOptions[0].key);

const renderActiveAccoundTab = () => {
  switch (activeTab) {
=======
  const [activeTabKey, setActiveTabKey] = useState("team");

const renderActiveAccountTab = () => {
  switch (activeTabKey) {
>>>>>>> Stashed changes
    case "team":
      return <MyTeamTab />;
    case "predictions":
      return (
        <PredictionView />
      );
    case "stats":
      return <div>Stats Tab Content</div>;
    default:
      return <MyTeamTab />;
  }
};

  return (
<<<<<<< Updated upstream
      <div className="w-full">
      <FfSubTabs tabOptions={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full bg-white/5 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center mt-4">
          {renderActiveAccoundTab()}
=======
      <div className="w-full h-full flex flex-col">
      <FfSubTabs tabOptions={tabOptions} activeTab={activeTabKey} setActiveTab={setActiveTabKey} />
      <div className="flex-1 overflow-hidden">
          {renderActiveAccountTab()}
>>>>>>> Stashed changes
      </div>
    </div>
  )
}

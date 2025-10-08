// src/app/home/account/page.tsx
import { useState } from "react";
import MyTeamTab from "./tabs/MyTeamTab";
import FfSubTabs from "../../../shared/components/FfSubTabs";
import PredictionView from "./tabs/PreditionTab";

export default function TeamView() {

  const tabOptions = [
    { key: "team", label: "My Team" },
    { key: "predictions", label: "Predictions" },
    { key: "stats", label: "Stats" },
  ];

  const [activeTab, setActiveTab] = useState(tabOptions[0].key);

const renderActiveAccoundTab = () => {
  switch (activeTab) {
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
      <div className="w-full">
      <FfSubTabs tabOptions={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full bg-white/5 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center mt-4">
          {renderActiveAccoundTab()}
      </div>
    </div>
  )
}

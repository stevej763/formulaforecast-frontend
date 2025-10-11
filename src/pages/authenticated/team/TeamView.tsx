// src/app/home/account/page.tsx
import { useState, useEffect } from "react";
import MyTeamTab from "./tabs/MyTeamTab";
import FfSubTabs from "../../../shared/components/FfSubTabs";
import PredictionView from "./tabs/PreditionTab";
import type { TabOption } from "../../../shared/components/FfSubTabs";

export default function TeamView() {

  const tabOptions: TabOption[] = [
    { key: "team", label: "My Team" },
    { key: "predictions", label: "Predictions" },
    { key: "stats", label: "Stats" },
  ];

  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("teamViewActiveTab") || tabOptions[0].key);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("teamViewActiveTab", activeTab);
    }
  }, [activeTab]);

const renderActiveAccountTab = () => {
  switch (activeTab) {
    case "team":
      return <MyTeamTab />;
    case "predictions":
      return <PredictionView />;
    case "stats":
      return <div>Stats Tab Content</div>;
    default:
      return <MyTeamTab />;
  }
};

  return (
      <div className="w-full h-full flex flex-col">
      <FfSubTabs tabOptions={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 pt-[57px]">
          {renderActiveAccountTab()}
      </div>
    </div>
  )
}

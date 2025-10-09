import type { TeamViewTab } from "../../pages/authenticated/team/TeamView";

export interface TabOption {
  key: TeamViewTab;
  label: string;
}

interface FfSubTabsProps {
  tabOptions: TabOption[];
  activeTab: TeamViewTab;
  setActiveTab: (key: TeamViewTab) => void;
}

const FfSubTabs = ({ tabOptions, activeTab, setActiveTab }: FfSubTabsProps) => {
  return (
    <div className="w-full bg-gray-900 border-b border-gray-700">
      <div className="flex w-full">
        {tabOptions.map(tab => (
          <button
            key={tab.key}
            className={`flex-1 px-2 sm:px-6 py-4 text-sm sm:text-base font-semibold transition-colors duration-150 focus:outline-none border-b-2 ${
              activeTab === tab.key
                ? "border-red-600 text-white bg-gray-900"
                : "border-transparent text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FfSubTabs;

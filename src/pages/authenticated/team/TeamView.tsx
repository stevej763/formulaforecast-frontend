// src/app/home/account/page.tsx
import CurrentRaceView from "./CurrentRaceView";
import UpcomingRaceView from "./UpcomingRaceView";

export default function TeamView() {
  return (
    <div className="w-full max-w-lg bg-white/5 rounded-xl shadow-lg p-2 flex flex-col items-center">
      <CurrentRaceView />
      <div className="w-full max-w-xs flex flex-row items-stretch gap-2 my-4">
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl shadow p-3 flex flex-col items-center justify-center">
          <span className="text-xs font-semibold text-gray-300 mb-1 tracking-wide">Avg Points</span>
          <span className="text-xl font-bold text-blue-400 drop-shadow">102</span>
        </div>
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl shadow p-3 flex flex-col items-center justify-center">
          <span className="text-xs font-semibold text-gray-300 mb-1 tracking-wide">Race Week</span>
          <span className="text-3xl font-bold text-green-400 drop-shadow">128</span>
        </div>
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl shadow p-3 flex flex-col items-center justify-center">
          <span className="text-xs font-semibold text-gray-300 mb-1 tracking-wide">Max Points</span>
          <span className="text-xl font-bold text-yellow-400 drop-shadow">156</span>
        </div>
      </div>
      <UpcomingRaceView />
    </div>
  );
}

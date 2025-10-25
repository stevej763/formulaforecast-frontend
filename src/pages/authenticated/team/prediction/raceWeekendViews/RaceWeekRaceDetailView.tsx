// src/app/home/navigation/RaceWeekRaceDetailView.tsx
"use client";
import { useState } from "react";
import { type RaceWeekend } from "../../../../../api/raceWeekendApiClient";
import PredictionsSelectionView from "../PredictionsSelectionView";
import CountdownToRace from "../../CountdownToRace";
import RaceHeader from "../../components/RaceHeader";
import { type UserTeam } from "../../../../../api/userTeamApiClient";

interface RaceWeekRaceDetailViewProps {
  currentRace: RaceWeekend;
  team: UserTeam;
}

export default function RaceWeekRaceDetailView({ 
  currentRace,
  team
}: RaceWeekRaceDetailViewProps) {
  const [makingPredictions, setMakingPredictions] = useState(false);

  if (makingPredictions) {
    return <PredictionsSelectionView race={currentRace} onComplete={() => setMakingPredictions(false)}  />;
  }

  const race = currentRace;
  if (!race) {
    return <div className="p-4 text-center text-gray-400">No current race</div>;
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-2xl overflow-hidden flex flex-col h-full">
      {/* Race Header */}
      <RaceHeader race={race} />

      {/* Countdown Section */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
        <CountdownToRace raceWeekendStartDate={race.raceWeekendStartDate} />
      </div>

        <div className="bg-black/20 p-4 sm:p-6 border-t border-white/10 flex-shrink-0 mt-auto">
          {team ? (
            <button
              className="w-full sm:w-auto sm:ml-auto sm:block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-150 transform hover:scale-105 active:scale-95"
              onClick={() => setMakingPredictions(true)}
            >
              Make Predictions
            </button>
          ) : (
            <div className="text-center">
              <p className="text-gray-300 mb-3">
                You need to create a team before making predictions
              </p>
              <p className="text-gray-400 text-sm">
                Head to the <span className="text-white font-semibold">My Team</span> tab to set up your team
              </p>
            </div>
          )}
        </div>
    </div>
  );
}
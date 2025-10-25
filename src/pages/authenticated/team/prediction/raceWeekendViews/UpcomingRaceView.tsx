// src/app/home/navigation/UpcomingRaceView.tsx
"use client";
import { useState } from "react";
import { type RaceWeekend} from "../../../../../api/raceWeekendApiClient";
import PredictionsSelectionView from "../PredictionsSelectionView";
import CountdownToRace from "../../CountdownToRace";
import RaceHeader from "../../components/RaceHeader";
import { type UserTeam } from "../../../../../api/userTeamApiClient";

interface UpcomingRaceDetailViewProps {
  upcomingRace: RaceWeekend;
  team: UserTeam;
}

export default function UpcomingRaceDetailView({ 
  upcomingRace
}: UpcomingRaceDetailViewProps) {
  const [makingPredictions, setMakingPredictions] = useState(false);

  if (makingPredictions) {
    return <PredictionsSelectionView race={upcomingRace} onComplete={() => setMakingPredictions(false)}  />;
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-2xl overflow-hidden flex flex-col h-full">
      {/* Race Header */}
      <RaceHeader race={upcomingRace} />

      {/* Countdown Section */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
        <CountdownToRace raceWeekendStartDate={upcomingRace.raceWeekendStartDate} />
      </div>
    </div>
  );
}

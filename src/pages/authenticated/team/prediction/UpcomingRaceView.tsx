// src/app/home/navigation/UpcomingRaceView.tsx
"use client";
import { useEffect, useState } from "react";
import {
  fetchCurrentRaceWeekend,
  fetchLiveRaceWeekend,
  fetchUpcomingRaceWeekend,
  type RaceWeekendResponse,
} from "../../../../api/raceWeekendApiClient";
import LoaderSpinner from "../../../../shared/components/LoaderSpinner";
import RaceStatusDetail from "../RaceStatusDetail";
import { formatRaceDates } from "../../../../shared/utilities/formatRaceDates";
import { getFlagIcon } from "../../../../shared/utilities/getFlagIcon";
import { formatEnumText } from "../../../../shared/utilities/formatEnumText";
import PredictionsSelectionView from "./PredictionsSelectionView";
import CountdownToRace from "../CountdownToRace";
import { type UserTeam } from "../../../../api/userTeamApiClient";
import { getUserTeam } from "../../../../api/userTeamApiClient";

export default function UpcomingRaceDetailView() {
  const [upcomingRace, setUpcomingRace] = useState<RaceWeekendResponse | null>(null);
  const [currentRace, setCurrentRace] = useState<RaceWeekendResponse | null>(null);
  const [liveRace, setLiveRace] = useState<RaceWeekendResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [makingPredictions, setMakingPredictions] = useState(false);
  const [userTeam, setUserTeam] = useState<UserTeam | null>(null);

  useEffect(() => {
    getUserTeam()
    .then((teamResponse) => {
      setUserTeam(teamResponse.teamDetailsDto);
    });


    fetchUpcomingRaceWeekend()
      .then((data) => {
        setUpcomingRace(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    fetchCurrentRaceWeekend()
      .then((data) => {
        setCurrentRace(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    fetchLiveRaceWeekend()
      .then((data) => {
        setLiveRace(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <LoaderSpinner />;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  if (makingPredictions && currentRace?.raceWeekendResponse) {
    return <PredictionsSelectionView race={currentRace?.raceWeekendResponse} onComplete={() => setMakingPredictions(false)}  />;
  }

  const race = liveRace?.raceWeekendResponse ?? currentRace?.raceWeekendResponse ?? upcomingRace?.raceWeekendResponse;
  if (!race) {
    return <div className="p-4 text-center text-gray-400">No upcoming race</div>;
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-2xl overflow-hidden flex flex-col h-full">
      {/* Race Header */}
      <div className="bg-black/20 p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
        <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-3xl sm:text-4xl flex-shrink-0">
              {getFlagIcon(race.raceName)}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white truncate">
                {formatEnumText(race.raceName)}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                {formatRaceDates(race.raceWeekendStartDate, race.raceWeekendEndDate)}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 self-start sm:self-auto">
            <RaceStatusDetail status={race.raceWeekendStatus} />
          </div>
        </div>
      </div>

      {/* Countdown Section */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
        <CountdownToRace raceWeekendStartDate={race.raceWeekendStartDate} />
      </div>

      {/* Action Button - Only show during race week */}
      {race.raceWeekendStatus === "RACE_WEEK" && (
        <div className="bg-black/20 p-4 sm:p-6 border-t border-white/10 flex-shrink-0 mt-auto">
          {userTeam ? (
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
      )}
    </div>
  );
}

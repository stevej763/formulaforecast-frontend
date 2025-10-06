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

export default function UpcomingRaceDetailView() {
  const [upcomingRace, setUpcomingRace] = useState<RaceWeekendResponse | null>(null);
  const [currentRace, setCurrentRace] = useState<RaceWeekendResponse | null>(null);
  const [liveRace, setLiveRace] = useState<RaceWeekendResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [makingPredictions, setMakingPredictions] = useState(false);

  useEffect(() => {
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
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-xl p-6 border-2 border-red-700">
      {/* Race Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">
            {getFlagIcon(race.raceName)}
          </span>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {formatEnumText(race.raceName)}
            </h2>
            <p className="text-sm text-gray-400">
              {formatRaceDates(race.raceWeekendStartDate, race.raceWeekendEndDate)}
            </p>
          </div>
        </div>
        <RaceStatusDetail status={race.raceWeekendStatus} />
      </div>

      {/* Countdown Section */}
      <div className="mb-6">
        <CountdownToRace raceWeekendStartDate={race.raceWeekendStartDate} />
      </div>

      {/* Action Button */}
      {race.raceWeekendStatus === "RACE_WEEK" && (
        <div className="flex justify-end">
          <button
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-150 transform hover:scale-105"
            onClick={() => setMakingPredictions(true)}
          >
            Make Predictions
          </button>
        </div>
      )}
    </div>
  );
}

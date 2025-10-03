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
    <li className="py-3 flex flex-col">
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-semibold text-gray-200">
            {getFlagIcon(race.raceName)}
          </span>
          <span className="text-lg font-semibold text-gray-200">
            {formatEnumText(race.raceName)}
          </span>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between items-center mt-2">
        <span className="text-xs text-gray-400">
          {formatRaceDates(race.raceWeekendStartDate, race.raceWeekendEndDate)}
        </span>
        <span>
          <RaceStatusDetail status={race.raceWeekendStatus} />
        </span>
      </div>
      <div className="mt-4">
        <CountdownToRace raceWeekendStartDate={race.raceWeekendStartDate} />
      </div>
      {race.raceWeekendStatus === "RACE_WEEK" && (
        <div className="flex w-full justify-end">
          <button
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-full shadow transition-colors duration-150"
            onClick={() => setMakingPredictions(true)}
          >
            Make Predictions
          </button>
        </div>
      )}
    </li>
  );
}

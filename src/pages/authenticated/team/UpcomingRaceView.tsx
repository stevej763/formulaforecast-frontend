// src/app/home/navigation/UpcomingRaceView.tsx
"use client";
import { useEffect, useState } from "react";
import {
  fetchUpcomingRaceWeekend,
  type NextRaceWeekendResponse,
} from "../../../api/raceWeekendApiClient";
import LoaderSpinner from "../../../shared/LoaderSpinner";
import RaceStatusDetail from "./RaceStatusDetail";
import { formatRaceDates } from "../../../shared/formatRaceDates";
import { getFlagIcon } from "../../../shared/getFlagIcon";
import { formatEnumText } from "../../../shared/formatEnumText";
import { Navigate, useNavigate } from "react-router-dom";

export default function UpcomingRaceView() {
  const navigate = useNavigate();
  const [upcomingRace, setUpcomingRace] = useState<NextRaceWeekendResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  if (loading) {
    return <LoaderSpinner />;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  const race = upcomingRace?.nextRaceWeekendResponse;

  if (!race) {
    return <div className="p-4 text-center text-gray-400">No upcoming race</div>;
  }

  return (
    <div className="w-full max-w-xs rounded-xl bg-white/10 backdrop-blur-md shadow-lg p-4 mb-4 border border-white/20 mx-auto">
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
        <button
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full shadow transition-colors duration-150"
          onClick={() => navigate("/preditions")}
        >
          Make Prediction
        </button>
      </li>
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  fetchCurrentRaceWeekend,
  type RaceWeekendResponse,
} from "../../../api/raceWeekendApiClient";
import { getFlagIcon } from "../../../shared/utilities/getFlagIcon";
import { formatEnumText } from "../../../shared/utilities/formatEnumText";
import { formatRaceDates } from "../../../shared/utilities/formatRaceDates";
import RaceStatusDetail from "./RaceStatusDetail";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";

export default function CurrentRaceView() {
  const [currentRace, setCurrentRace] = useState<RaceWeekendResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentRaceWeekend()
      .then((data) => {
        setCurrentRace(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-red-500">
        <LoaderSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  const race = currentRace?.raceWeekendResponse;

  if (!race) {
    return;
  }

  return (
    <div className="w-full max-w-xs rounded-xl bg-white/10 backdrop-blur-md shadow-lg p-4 border border-white/20 mx-auto">
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
      </li>
    </div>
  );
}

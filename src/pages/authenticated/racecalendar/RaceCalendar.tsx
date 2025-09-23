// src/app/home/racecalendar/RaceCalendar.tsx
import React, { useEffect, useState } from "react";
import RaceDetail from "./RaceDetail";
import { fetchAllRaceWeekends, type RaceWeekend } from "../../../api/raceWeekendApiClient";
import LoaderSpinner from "../../../shared/LoaderSpinner";

const RaceCalendar = () => {
  const [raceWeekends, setRaceWeekends] = useState<Array<RaceWeekend>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllRaceWeekends()
      .then((data) => {
        setRaceWeekends(data.raceWeekendResponses);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const renderRaceWeekendList = () => {
    if (!raceWeekends || raceWeekends.length === 0) {
      return <div className="text-red-400 text-center">No raceweekends found</div>;
    }
    const orderedRaces = raceWeekends.sort(
      (a, b) =>
        new Date(a.raceWeekendStartDate).getTime() - new Date(b.raceWeekendStartDate).getTime()
    );
    return (
      <ul className="divide-y divide-gray-700">
        {orderedRaces.map((race, idx) => (
          <RaceDetail key={idx} race={race} />
        ))}
      </ul>
    );
  };

  if (loading) {
    return <LoaderSpinner />;
  }

  if (error) {
    return <div className="text-red-400 text-center">{error}</div>;
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-lg p-6 mt-4">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow">
        Race Calendar
      </h2>
      <div className="text-base text-gray-100">{renderRaceWeekendList()}</div>
    </div>
  );
};

export default RaceCalendar;

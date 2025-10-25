// src/app/home/navigation/LiveRaceWeekendView.tsx
"use client";
import {
    type RaceWeekend,
} from "../../../../../api/raceWeekendApiClient";
import RaceHeader from "../../components/RaceHeader";
import { type UserTeam } from "../../../../../api/userTeamApiClient";
import { useEffect, useState } from "react";
import { fetchExistingPredictionForRaceWeekend, type ExistingPredictionsMap, fetchPredictionTypes, type PredictionType } from "../../../../../api/predictionsApiClient";
import { fetchAllDrivers, type Driver } from "../../../../../api/driversApiClient";
import PredictionList from "../PredictionList";
import LoaderSpinner from "../../../../../shared/components/LoaderSpinner";

interface LiveRaceWeekendViewProps {
  liveRace: RaceWeekend;
  team: UserTeam;
}

export default function LiveRaceWeekendView({ 
  liveRace,
  team
}: LiveRaceWeekendViewProps) {

  const [predictions, setPredictions] = useState<ExistingPredictionsMap | null>(null);
  const [predictionTypes, setPredictionTypes] = useState<PredictionType[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [existingPredictions, predictionTypesData, driversData] = await Promise.all([
          fetchExistingPredictionForRaceWeekend({
            userTeamUid: team.teamUid,
            raceWeekendUid: liveRace.raceWeekendUid
          }),
          fetchPredictionTypes(),
          fetchAllDrivers()
        ]);
        
        setPredictions(existingPredictions.predictions);
        setPredictionTypes(predictionTypesData.predictionTypes);
        setDrivers(driversData.drivers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [liveRace.raceWeekendUid, team.teamUid]);

  // Helper functions for PredictionList
  const requiresTopThree = (predictionType: string) => {
    const TOP_THREE_TYPES = ['RACE_TOP_THREE', 'QUALIFYING_TOP_THREE'];
    return TOP_THREE_TYPES.some(type => predictionType.toUpperCase().includes(type));
  };

  const getDriverName = (driver: Driver) => {
    return driver.nickname || `${driver.firstName} ${driver.lastName}`;
  };

  // Convert predictions to PredictionList format
  const convertedPredictions = predictions ? Object.keys(predictions).reduce((acc, predictionTypeUid) => {
    const prediction = predictions[predictionTypeUid];
    if (prediction) {
      acc[predictionTypeUid] = prediction.rankedDriverPredictions.map(detail => {
        const driver = drivers.find(d => d.driverUid === detail.driverUid);
        return driver ? { driver, rank: detail.rank } : null;
      }).filter((entry): entry is { driver: Driver; rank: number } => entry !== null);
    }
    return acc;
  }, {} as { [predictionTypeUid: string]: { driver: Driver; rank: number }[] }) : {};

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-2xl overflow-hidden flex flex-col h-full">
      {/* Race Header */}
      <RaceHeader race={liveRace} />
      
      {/* Predictions List */}
      <PredictionList
        predictionTypes={predictionTypes}
        predictions={convertedPredictions}
        onPredictionTypeSelect={() => {}}
        requiresTopThree={requiresTopThree}
        getDriverName={getDriverName}
      />
    </div>
  );
}